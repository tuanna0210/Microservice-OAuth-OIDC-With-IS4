using Catalog.API.DTOs;
using MediatR;

namespace Catalog.API.Product.Queries.GetProducts
{
    public record GetProductsQuery() : IRequest<GetProductsResult>
    {

    }

    public record GetProductsResult()
    {
        public IReadOnlyList<ProductDto> Products { get; set; }
    }


    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, GetProductsResult>
    {
        public async Task<GetProductsResult> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            return new GetProductsResult()
            {
                Products = new List<ProductDto>()
                {
                    new ProductDto()
                    {
                        Name = "IPhone X",
                        Price = 1000
                    },
                    new ProductDto()
                    {
                        Name = "Samsung galaxy S24 Ultra",
                        Price = 1800
                    }
                }
            };
        }
    }
}
