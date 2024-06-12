# Microservice-OAuth-OIDC-With-IS4

Angular client cần được set allow cors khi setting client
![image](https://github.com/tuanna0210/Microservice-OAuth-OIDC-With-IS4/assets/37151694/b6b6ead6-5b8c-4d55-826a-6370c3d2baab)
##AutomaticRedirectAfterSignOut
- To automactic redirect to the client page after signout, you have to set AccountOptions.AutomaticRedirectAfterSignOut = true in IdentityServer4 project (default is false).
- You also need to config PostLogoutRedirectUrls property for your client 
