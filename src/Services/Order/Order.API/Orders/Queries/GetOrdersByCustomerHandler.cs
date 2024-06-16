using MediatR;
using Order.API.Contracts.Services;
using Order.API.DTOs;

namespace Order.API.Orders.Queries
{
    public record GetOrdersByCustomerQuery(Guid CustomerId) : IRequest<GetOrdersByCustomerResult>;
    public record GetOrdersByCustomerResult()
    {
        public List<ProductDto> Products { get; set; }
    }
    public class GetOrdersByCustomerQueryHandler(
        IProductService productService) : IRequestHandler<GetOrdersByCustomerQuery, GetOrdersByCustomerResult>
    {
        public async Task<GetOrdersByCustomerResult> Handle(GetOrdersByCustomerQuery request, CancellationToken cancellationToken)
        {
            var products = await productService.GetProductsAsync();
            return new GetOrdersByCustomerResult()
            {
                Products = products
            };
        }
    }
}
