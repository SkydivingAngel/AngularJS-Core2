using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Net.Http.Headers;
using System.Linq;

namespace AngularJsCore
{
    public class ViewsRedirectRule : IRule
    {
        private readonly string[] matchPaths;
        private readonly PathString newPath;
        public static string SiteAddress = "";

        public ViewsRedirectRule(string[] matchPaths, string newPath)
        {
            this.matchPaths = matchPaths;
            this.newPath = new PathString(newPath);
        }

        public void ApplyRule(RewriteContext context)
        {
            var request = context.HttpContext.Request;

            if (request.Path.StartsWithSegments(new PathString(newPath)))
            {
                return;
            }

            if (matchPaths.Contains(request.Path.Value))
            {
                string newLocation = "http://" + SiteAddress + "/angularcore/#" + request.Path;

                var response = context.HttpContext.Response;
                response.StatusCode = StatusCodes.Status302Found;
                context.Result = RuleResult.EndResponse;
                response.Headers[HeaderNames.Location] = newLocation;
            }
        }
    }
}
