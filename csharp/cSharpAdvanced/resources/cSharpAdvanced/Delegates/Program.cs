using System;

namespace Delegates
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var processor = new PhotoProcessor();
            var filters = new PhotoFilters();
            Action<Photo> filterHandler = filters.ApplyContrast;
            filterHandler += filters.ReduceRedEye;
            filterHandler += MakeBlackAndWhite;
            
            processor.Process("photo.jpg", filterHandler);
        }

        static void MakeBlackAndWhite(Photo photo)
        {
            Console.WriteLine("Making photo black and white");
        }
    }
}