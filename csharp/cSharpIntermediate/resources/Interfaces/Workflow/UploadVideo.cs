using System;

namespace Workflow
{
    public class UploadVideo : IActivity
    {
        public void Execute()
        {
            Console.WriteLine("Video uploaded");
        }
    }
}