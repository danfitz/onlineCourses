using System;

namespace DbExercise
{
    public class OracleConnection : DbConnection
    {
        public OracleConnection(string connectionString) : base(connectionString)
        {
        }

        public override void Connect()
        {
            Console.WriteLine("Connected to Oracle database");
        }
        public override void Disconnect()
        {
            Console.WriteLine("Disconnected from Oracle database");
        }
    }
}