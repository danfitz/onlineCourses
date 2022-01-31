using System;

namespace AccessModifiers
{

    public class Person
    {
        private DateTime _birthdate;

        public void SetBirthdate(DateTime birthdate)
        {
            _birthdate = birthdate;
        }

        public DateTime GetBirthdate()
        {
            return _birthdate;
        }
    }
    internal class Program
    {
        public static void Main(string[] args)
        {
            var person = new Person();
            person.SetBirthdate(new DateTime(1992, 5, 25));
            Console.WriteLine(person.GetBirthdate());
        }
    }
}