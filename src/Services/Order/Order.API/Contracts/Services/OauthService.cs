
using IdentityModel.Client;
using Microsoft.Extensions.Options;
using Authorization = Order.API.Contracts.Configurations.Authorization;

namespace Order.API.Contracts.Services
{
    public class OauthService : IOauthService
    {
        private readonly HttpClient _httpClient;
        private readonly Authorization _oauthConfig;
        private readonly ILogger<OauthService> _logger;
        public OauthService(
            HttpClient client,
            IOptions<Authorization> authConfigOptions,
            ILogger<OauthService> logger)
        {
            _httpClient = client;
            _oauthConfig = authConfigOptions.Value;
            _logger = logger;
        }
        public async Task<string> RequestClientCredentialsTokenAsync()
        {
            var disco = await GetDiscoveryDocumentResponseAsync();

            var tokenResponse = await _httpClient.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest()
            {
                Address = disco.TokenEndpoint,
                ClientId = _oauthConfig.Client.ClientId,
                ClientSecret = _oauthConfig.Client.ClientSecret,
                Scope = _oauthConfig.Client.Scope
            });
            if (tokenResponse.IsError)
            {
                _logger.LogError(tokenResponse.Error);
                throw new HttpRequestException("Something went wrong while requesting the access token");
            }
            return tokenResponse.AccessToken!;
        }

        private async Task<DiscoveryDocumentResponse> GetDiscoveryDocumentResponseAsync()
        {
            var disco = await _httpClient.GetDiscoveryDocumentAsync(_oauthConfig.IdentityServerBaseUrl);
            if (disco.IsError) throw new Exception(disco.Error);
            return disco;
        }
    }
}
