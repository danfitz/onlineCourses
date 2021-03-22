using System;

namespace StackOverflow
{
    public class Post
    {
        public string Title { get; }
        public string Description { get; }
        public DateTime Created { get; }
        public int Votes { get; private set; }

        public Post(string title, string description)
        {
            Title = title;
            Description = description;
            Created = DateTime.Now;
        }

        public void Upvote()
        {
            Votes += 1;
        }

        public void Downvote()
        {
            Votes -= 1;
        }
    }
}