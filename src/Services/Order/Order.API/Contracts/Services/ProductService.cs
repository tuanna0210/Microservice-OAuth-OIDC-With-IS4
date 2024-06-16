using Mapster;
using Order.API.DTOs;

namespace Order.API.Contracts.Services
{
    public class ProductService(HttpClient _client, ILogger<ProductService> _logger) : IProductService
    {
        public async Task<List<ProductDto>> GetProductsAsync()
        {

            var productsResponse = await _client.GetAsync("api/products");

            if (!productsResponse.IsSuccessStatusCode)
            {
                _logger.LogError("Failed to get products. StatusCode: {0}", productsResponse.StatusCode);
                throw new Exception("Failed to get products.");
            }
            var getProductsResult = await productsResponse.Content.ReadFromJsonAsync<GetProductsResult>();
            return getProductsResult!.Products.Adapt<List<ProductDto>>();
        }
    }
}
