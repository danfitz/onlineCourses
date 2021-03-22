using System;

namespace DbExercise
{
    public class SqlConnection : DbConnection
    {
        public SqlConnection(string connectionString) : base(connectionString)
        {
        }

        public override void Connect()
        {
            Console.WriteLine("Connected to SQL database");
        }
        public override void Disconnect()
        {
            Console.WriteLine("Disconnected from SQL database");
        }
    }
}