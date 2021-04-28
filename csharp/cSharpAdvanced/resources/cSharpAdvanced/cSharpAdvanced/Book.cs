namespace cSharpAdvanced
{
    public class Book
    {
        public int Price { get; set; }
    }
    
    public class BookCalculator<TBook> where TBook : Book
    {
        public int GetPrice(TBook book)
        {
            book.Price = 100;
            return book.Price;
        }
    }
}