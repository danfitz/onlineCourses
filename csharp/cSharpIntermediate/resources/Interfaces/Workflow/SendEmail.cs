using System;

namespace Workflow
{
    public class SendEmail : IActivity
    {
        public void Execute()
        {
            Console.WriteLine("Email sent");
        }
    }
}