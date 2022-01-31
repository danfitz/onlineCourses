using System;

namespace DbExercise
{
    public class DbCommand
    {
        private DbConnection DbConnection { get; }
        private string Instruction { get; }

        public DbCommand(DbConnection dbConnection, string instruction)
        {
            if (String.IsNullOrEmpty(instruction)) throw new ArgumentNullException(nameof(instruction));
            DbConnection = dbConnection ?? throw new ArgumentNullException(nameof(dbConnection));
            Instruction = instruction;
        }

        public void Execute()
        {
            DbConnection.Connect();
            Console.WriteLine(Instruction);
            DbConnection.Disconnect();
        }
    }
}