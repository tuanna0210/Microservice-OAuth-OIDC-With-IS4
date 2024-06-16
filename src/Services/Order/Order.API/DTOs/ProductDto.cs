namespace Order.API.DTOs
{
    public class ProductDto
    {
        public string Name { get; set; }
        public double Price { get; set; }
    }

    public record GetProductsResult()
    {
        public IReadOnlyList<ProductDto> Products { get; set; }
    }
}
