namespace Order.API.Contracts.Services
{
    public interface IOauthService
    {
        Task<string> RequestClientCredentialsTokenAsync();
    }
}
