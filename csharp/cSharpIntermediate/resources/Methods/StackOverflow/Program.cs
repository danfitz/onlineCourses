using System;

namespace StackOverflow
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var post = new Post("Why JavaScript?", "I like JS, but why use it?");
            Console.WriteLine(post.Title);
            Console.WriteLine(post.Description);
            Console.WriteLine(post.Created);
            
            post.Upvote();
            post.Upvote();
            Console.WriteLine(post.Votes);

            post.Downvote();
            post.Upvote();
            post.Upvote();
            Console.WriteLine(post.Votes);
        }
    }
}