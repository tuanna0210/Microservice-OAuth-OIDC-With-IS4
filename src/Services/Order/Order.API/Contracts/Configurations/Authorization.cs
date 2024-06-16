namespace Order.API.Contracts.Configurations
{
    public class Authorization
    {
        public string IdentityServerBaseUrl { get; set; } = null!;
        public ApiResource ApiResource { get; set; } = new();
        public Client Client { get; set; }

    }
    public class ApiResource
    {
        public string Name { get; set; } = null!;
        public string Secret { get; set; } = null!;
    }
    public class Client
    {
        public string ClientId { get; set; } = null!;
        public string ClientSecret { get; set; } = null!;
        public string Scope { get; set; }
    }

}
