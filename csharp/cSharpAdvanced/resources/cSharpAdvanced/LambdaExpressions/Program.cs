using System;

namespace LambdaExpressions
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            Func<int, int> square = number => number * number;
            Console.WriteLine(square(5));

            const int factor = 5;

            Func<int, int> multiplier = n => n * factor;
            Console.WriteLine(multiplier(100));

            var books = new BookRepository().GetBooks();
            var cheapBooks = books.FindAll(book => book.Price < 10);

            foreach (var book in cheapBooks)
            {
                Console.WriteLine(book.Title);
            }
        }
    }
}