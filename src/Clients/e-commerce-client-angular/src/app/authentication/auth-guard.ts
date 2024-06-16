import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, filter, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class AuthGuard {

  constructor(
    private authService: AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.isDoneLoading$.pipe(
      filter(isDone => isDone),
      switchMap(_ => this.authService.accessRouteConditions$(route)),
      map(([isAuthenticated, hasValidAccessToken]) => 
        {
            console.log(isAuthenticated);
            console.log(hasValidAccessToken);
            //return true;
            if(isAuthenticated && hasValidAccessToken)
            {
                //Đã login và có quyền => can active
                return true;
            }
            else {
                this.authService.login(state.url);
                return false;
            }
        }),
    );
  }
}