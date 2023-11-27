using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasketAsync()
    {
        var basket = await RetrieveBasketAsync();

        if (basket == null)
        {
            return NotFound();
        }

        return basket;
    }


    [HttpPost]
    public async Task<ActionResult> AddItemToBasketAsync(int productId, int quantity)
    {
        var basket = await RetrieveBasketAsync() ?? CreateBasket();

        var product = await _context.Products.FindAsync(productId);

        if(product == null) return NotFound();

        basket.AddItem(product, quantity);

        var result = await _context.SaveChangesAsync() > 0;

        if(result) return StatusCode(201);

        return BadRequest(new ProblemDetails{Title = "Problem saving item to basket."});
    }

    // [HttpDelete]
    // public async Task<ActionResult> RemoveItemFromBasketAsync(int productId, int quantity)
    // {
    //   return Ok();
    // }

    private async Task<Basket> RetrieveBasketAsync()
    {
        if (Request.Cookies.TryGetValue("buyerId", out string buyerIdString) && int.TryParse(buyerIdString, out int buyerId))
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        return null;
    }

    private Basket CreateBasket()
    {
        var buyerId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
        Response.Cookies.Append("buyerId", buyerId, cookieOptions);

        var basket = new Basket { BuyerId = 123 };

        _context.Baskets.Add(basket);

        return basket;
    }


  }
}