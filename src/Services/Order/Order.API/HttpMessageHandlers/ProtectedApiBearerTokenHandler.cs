
using IdentityModel.Client;
using Order.API.Contracts.Services;

namespace Order.API.HttpMessageHandlers
{
    public class ProtectedApiBearerTokenHandler : DelegatingHandler
    {
        private readonly IOauthService _authService;
        public ProtectedApiBearerTokenHandler(IOauthService authService)
        {
            _authService = authService;
        }
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            // request the access token
            var accessToken = await _authService.RequestClientCredentialsTokenAsync();

            // set the bearer token to the outgoing request
            request.SetBearerToken(accessToken);
            return await base.SendAsync(request, cancellationToken);
        }
    }
}
