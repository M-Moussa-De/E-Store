namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
           if(Items.All(item => item.ProductId != product.Id))
           {
             Items.Add(new BasketItem{Product = product, Quantity = quantity});
           }

           var exisitingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

           if(exisitingItem != null) exisitingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
           var item = Items.FirstOrDefault(item => item.ProductId == productId);

           if(item == null) return;

           item.Quantity -= quantity;

           if(item.Quantity == 0) Items.Remove(item);
        }
    }
}