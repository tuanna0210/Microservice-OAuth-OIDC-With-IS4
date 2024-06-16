using Catalog.API.Product.Queries.GetProducts;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("api/products")]
    [Authorize]
    public class ProductController(ISender sender) : ControllerBase
    {
        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var query = new GetProductsQuery();
            var result = await sender.Send(query);

            return Ok(result);
        }
    }
}
