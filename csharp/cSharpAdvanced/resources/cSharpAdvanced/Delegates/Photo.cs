using System;

namespace Delegates
{
    public class Photo
    {
        public static Photo Load(string path)
        {
            Console.WriteLine($"Loading {path}");
            return new Photo();
        }

        public void Save()
        {
            Console.WriteLine("Saved photo");
        }
    }
}