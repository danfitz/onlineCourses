using System;
using System.Threading;

namespace EventsAndDelegates
{
    internal class Program
    {
        public class Video
        {
            public string Title { get; set; }
        }

        public class VideoEventArgs : EventArgs
        {
            public Video Video { get; set; }
        }

        public class VideoEncoder
        {
            public event EventHandler<VideoEventArgs> VideoEncoded;
            
            public void Encode(Video video)
            {
                Console.WriteLine("Encoding video...");
                Thread.Sleep(3000);
                OnVideoEncoded(video);
            }

            protected virtual void OnVideoEncoded(Video video)
            {
                VideoEncoded?.Invoke(this, new VideoEventArgs() { Video = video });
            }
        }

        public class MailService
        {
            public void OnVideoEncoded(object source, VideoEventArgs e)
            {
                Console.WriteLine("Mail service sending email..." + e.Video.Title);
            }
        }

        public class MessageService
        {
            public void OnVideoEncoded(object source, VideoEventArgs e)
            {
                Console.WriteLine("Message service sending message..." + e.Video.Title);
            }
        }
        
        public static void Main(string[] args)
        {
            var video = new Video() {Title = "Video 1"};
            var videoEncoder = new VideoEncoder(); // publisher
            var mailService = new MailService(); //subscriber
            var messageService = new MessageService(); // subscriber
            videoEncoder.VideoEncoded += mailService.OnVideoEncoded;
            videoEncoder.VideoEncoded += messageService.OnVideoEncoded;
            
            videoEncoder.Encode(video);
        }
    }
}