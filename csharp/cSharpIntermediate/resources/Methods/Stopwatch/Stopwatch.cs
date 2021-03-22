using System;

namespace Stopwatch
{
    public class Stopwatch
    {
        private DateTime _startTime;
        private DateTime _stopTime;
        private bool _running;

        public void Start()
        {
            if (!_running)
            { 
                _startTime = DateTime.Now;
                _running = true;
            }
            else
            {
                Console.WriteLine("Timer already started, so you can't start it again! You must stop it first.");
            }
        }

        public void Stop()
        {
            if (_running)
            {
                _stopTime = DateTime.Now;
                _running = false;
            }
            else
            {
                Console.WriteLine("Timer hasn't started, so it can't be stopped! You must start it first.");
            }
        }

        public TimeSpan MeasuredTime
        {
            get
            {
                if (!_running)
                    return _stopTime - _startTime;

                return default;
            }
        }
    }
}