using System;

namespace Constructors
{
    public class Vehicle
    {
        private readonly string _registrationNumber;

        // public Vehicle()
        // {
        //     Console.WriteLine("Vehicle initialized");
        // }

        public Vehicle(string registrationNumber)
        {
            _registrationNumber = registrationNumber;
            Console.WriteLine("Vehicle initialized: {0}", registrationNumber);
        }
    }
}