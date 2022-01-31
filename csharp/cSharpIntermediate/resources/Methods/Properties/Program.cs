using System;

namespace Properties
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var person = new Person(new DateTime(1982, 1, 1));
            Console.WriteLine(person.Age);

            person.FirstName = "Dan";
            person.LastName = "Fitz";
            Console.WriteLine(person.FullName);
        }
    }
}