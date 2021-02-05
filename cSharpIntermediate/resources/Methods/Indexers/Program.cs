using System;

namespace Indexers
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var cookie = new HttpCookie();
            cookie["name"] = "Mosh";
            Console.WriteLine(cookie["name"]);
        }
    }
}