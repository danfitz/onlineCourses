using System.Collections.Generic;

namespace Workflow
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            var workflowEngine = new WorkflowEngine();
            var workflow = new Workflow();
            workflow.Add(new UploadVideo());
            workflow.Add(new SendEmail());
            workflowEngine.Run(workflow);
        }
    }
}