using MediatR;
using Microsoft.AspNetCore.Mvc;
using Order.API.Orders.Queries;

namespace Order.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrderController : ControllerBase
    {
        private readonly ISender _sender;
        public OrderController(ISender sender)
        {
            _sender = sender;
        }

        [HttpGet("{customerId}")]
        public async Task<IActionResult> Get(Guid customerId)
        {
            var query = new GetOrdersByCustomerQuery(customerId);
            var result = await _sender.Send(query);
            return Ok(result);
        }
    }
}
