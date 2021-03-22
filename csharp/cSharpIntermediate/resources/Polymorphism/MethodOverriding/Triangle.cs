using System;

namespace MethodOverriding
{
    public class Triangle : Shape
    {
        public override void Draw()
        {
            Console.WriteLine("Draw a triangle");
        }
    }
}