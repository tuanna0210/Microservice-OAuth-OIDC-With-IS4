using Order.API.DTOs;

namespace Order.API.Contracts.Services
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetProductsAsync();
    }
}
