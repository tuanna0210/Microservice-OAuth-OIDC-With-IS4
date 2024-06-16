import { AuthService } from "./auth.service";

//This factory method will be run by angular when the application loads (via APP_INITIALIZER InjectionToken)
export function authAppInitializerFactory(authService: AuthService): () => Promise<void> {
    return () => authService.processLogin();
}