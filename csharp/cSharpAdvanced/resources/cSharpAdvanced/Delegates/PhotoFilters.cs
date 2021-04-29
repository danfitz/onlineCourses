using System;

namespace Delegates
{
    public class PhotoFilters
    {
        public void ApplyContrast(Photo photo)
        {
            Console.WriteLine("Applying contrast");
        }

        public void ReduceRedEye(Photo photo)
        {
            Console.WriteLine("Reducing red eye");
        }
    }
}