namespace Composition
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var logger = new Logger();
            var dbMigrator = new DbMigrator(logger);
            var installer = new Installer(logger);
            
            dbMigrator.Migrate();
            installer.Install();
        }
    }
}