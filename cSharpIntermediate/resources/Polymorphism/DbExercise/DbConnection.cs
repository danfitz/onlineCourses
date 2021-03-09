using System;

namespace DbExercise
{
    public abstract class DbConnection
    {
        protected string ConnectionString { get; }
        public TimeSpan Timeout { get; set; } = new TimeSpan(0, 0, 0, 10);

        protected DbConnection(string connectionString)
        {
            if (String.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentNullException(nameof(connectionString));
            }
            ConnectionString = connectionString;
        }

        public abstract void Connect();
        public abstract void Disconnect();
    }
}