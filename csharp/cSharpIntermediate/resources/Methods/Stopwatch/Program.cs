using System;
using System.Threading;

namespace Stopwatch
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            Thread.Sleep(2000);
            
            stopwatch.Stop();
            Console.WriteLine(stopwatch.MeasuredTime);
        }
    }
}