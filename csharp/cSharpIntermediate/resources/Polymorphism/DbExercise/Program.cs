namespace DbExercise
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var oracle = new OracleConnection("23423jf;lkjs0fjsokj");
            var sql = new SqlConnection("2k3j;f2fdsf232jpwodfsj");
            var dbCommand = new DbCommand(oracle, "SELECT * FROM Users");
            dbCommand.Execute();
        }
    }
}