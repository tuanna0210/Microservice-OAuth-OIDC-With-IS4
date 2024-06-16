import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { authAppInitializerFactory } from './auth-app-initializer.factory';
import { OAuthModule, OAuthModuleConfig, OAuthStorage, ValidationHandler } from 'angular-oauth2-oidc';
import { authModuleConfig } from './auth-module-config';
import { AuthGuard } from './auth-guard';

export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OAuthModule.forRoot(authModuleConfig),
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthenticationModule {
  static forRoot(): ModuleWithProviders<AuthenticationModule> {
    return {
      ngModule: AuthenticationModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true },
        // { provide: AuthConfig, useValue: authConfig },
        // { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthenticationModule) {
    if (parentModule) {
      throw new Error('AuthenticationModule is already loaded. Import it in the AppModule only');
    }
  }
}
