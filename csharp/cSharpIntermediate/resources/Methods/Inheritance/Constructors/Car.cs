using System;

namespace Constructors
{
    public class Car : Vehicle
    {
        public Car(string registrationNumber)
            : base(registrationNumber)
        {
            Console.WriteLine("Car initialized: {0}", registrationNumber);
        }
    }
}