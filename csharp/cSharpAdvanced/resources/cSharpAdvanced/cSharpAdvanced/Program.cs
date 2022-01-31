using System.Collections.Generic;

namespace cSharpAdvanced
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var dictionary = new GenericDictionary<string, Book>();
            dictionary.Add("hello", new Book());
        }
    }
}