import { Injectable } from '@angular/core';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, Observable, combineLatest, distinctUntilChanged, filter, map, of } from 'rxjs';
import { authCodeFlowConfig } from './auth-config';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new BehaviorSubject<boolean>(false);
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();
  
  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) { 
    console.log('AuthService constructor');
    this.oauthService.configure(authCodeFlowConfig);

    //Subscribe to oauth event, useful for debugging:
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
    });

    this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());//Initial value

    this.oauthService.events
      .subscribe(_ => {
        this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken());
      });
    

    this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(e => this.oauthService.loadUserProfile());

    //BUG: Even the token has expired, the method this.oauthService.hasValidAccessToken() keep return true
    //and line 36 (this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken())), this.isAuthenticatedSubject$ is set to true instead of false when the 'token_expires' is occured
    this.oauthService.events
      .pipe(filter(e => e.type == 'token_expires'))
      .subscribe(e => {
          this.isAuthenticatedSubject$.next(false);
      });

    // this.oauthService.events
    //   .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
    //   .subscribe(e => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();//Set auto refresh token
  }

  //This method is registered with APP_INITIALIZER, so it is called when the application starts (or when page is reload)
  //TODO: Pass pages you don't want to run this method 
  public processLogin(excludePages: string[] = []) : Promise<void> {
    if(excludePages.length > 0){
      //TODO:
      return Promise.resolve();
    }

    return this.oauthService.loadDiscoveryDocumentAndLogin({
        state: this.router.url
      })//Only calls to IS4 if the token is invalid
      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
        }
        else {
          this.oauthService.initCodeFlow();
          return Promise.reject();
        }
      })
      .then(() => {
        this.isDoneLoadingSubject$.next(true);
        console.log(this.oauthService.state);
        //redirect to current page after login
        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          let stateUrl = this.oauthService.state;
          if (stateUrl.startsWith('/') === false) {
            stateUrl = decodeURIComponent(stateUrl);
          }
          console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
          this.router.navigateByUrl(stateUrl);
        }
      })
      .catch((err) => {
        this.isDoneLoadingSubject$.next(true);
      });
  }

  public accessRouteConditions$(route: ActivatedRouteSnapshot): Observable<boolean[]>
  {
    return combineLatest([
      this.isAuthenticated$,
      of(this.oauthService.hasValidAccessToken())
    ]).pipe(
      map(([isAuthenticated, hasValidAccessToken]) => [isAuthenticated, hasValidAccessToken]),
      distinctUntilChanged()
    );
  };
  

  login(targetUrl?: string){
    this.oauthService.initCodeFlow(targetUrl || this.router.url);
  }

  public logout() { 
    this.oauthService.revokeTokenAndLogout();
  }

  public hasValidToken() { return this.oauthService.hasValidAccessToken(); }

  // These method are for debug purpose only, disable on production
  public get accessToken() { return this.oauthService.getAccessToken(); }
  public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  public get idToken() { return this.oauthService.getIdToken(); }
  public get logoutUrl() { return this.oauthService.logoutUrl; }
}
