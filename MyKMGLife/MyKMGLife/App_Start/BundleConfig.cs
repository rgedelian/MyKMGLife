using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Optimization;

namespace MyKMGLife
{
    // http://stackoverflow.com/questions/11979718/how-can-i-specify-an-explicit-scriptbundle-include-order
    /// <summary>
    /// makes the files in the bundle appear in the order they were specified.  instead of doing something dumb like trying to put jquery first (the default)
    /// </summary>
    internal class AsIsBundleOrderer : IBundleOrderer
    {
        public virtual IEnumerable<BundleFile> OrderFiles(BundleContext context, IEnumerable<BundleFile> files)
        {
            return files;
        }
    }

    internal static class BundleExtensions
    {
        public static Bundle ForceOrdered(this Bundle sb)
        {
            sb.Orderer = new AsIsBundleOrderer();
            return sb;
        }
    }

    public class AngularWrapperTransform : IBundleTransform
    {
        private readonly string _moduleName;
        public AngularWrapperTransform(string moduleName)
        {
            _moduleName = moduleName;
        }

        // http://blog.scottlogic.com/2014/08/18/asp-angular-optimisation.html
        public void Process(BundleContext context, BundleResponse response)
        {
            var strBundleResponse = new StringBuilder();
            // Javascript module for Angular that uses templateCache 
            strBundleResponse.AppendFormat(
                @"angular.module('{0}').run(['$templateCache',function(t){{",
                _moduleName);

            foreach (var file in response.Files)
            {
                // Get the partial page, remove line feeds and escape quotes
                var content = file.ApplyTransforms()
                    .Replace("\r\n", "").Replace("'", "\\'");
                // Create insert statement with template
                strBundleResponse.AppendFormat(
                    @"t.put('{0}','{1}');", file.VirtualFile.VirtualPath, content);
            }
            strBundleResponse.Append(@"}]);");

            response.Files = new BundleFile[] { };
            response.Content = strBundleResponse.ToString();
            response.ContentType = "text/javascript";
        }
    }

    public class HtmlBundleWithAngularWrapper : Bundle
    {
        public HtmlBundleWithAngularWrapper(string moduleName, string virtualPath)
            : base(virtualPath, new[] { new AngularWrapperTransform(moduleName) })
        {
        }
    }

    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/scripts.js")
                .Include(
                    "~/Scripts/jquery-{version}.min.js",
                    "~/Scripts/jquery-ui.js",
                    "~/Scripts/lodash.js"
                    //"~/Scripts/rangyinputs-jquery.js",
                    //"~/Scripts/es6-shim.js"
                    )        // NOTE: shim for IE
                    .ForceOrdered());

            // for all angular stuff
            bundles.Add(new ScriptBundle("~/bundles/angular.js")
                .Include(
                    "~/Scripts/angular.js",
                    "~/Scripts/angular-ui-router.js",
                    "~/Scripts/angular-resource.js",
                    //"~/Scripts/angular-animate.js",
                    "~/Scripts/angular-ui/ui-bootstrap-tpls.js"
                    //"~/Scripts/angular-toastr.tpls.js",
                    //"~/Scripts/angular-messages.js",
                    //"~/Scripts/angular-spinners.js",
                    //"~/Scripts/angular-sanitize.js",    // required for ui-select
                    //"~/Scripts/angular-ui/ui-select.js",
                    //"~/Scripts/textAngular/textAngular-rangy.min.js",
                    //"~/Scripts/textAngular/textAngular-sanitize.min.js",
                    //"~/Scripts/textAngular/textAngular.min.js",
                    //"~/Scripts/angular-ui-router-title.js"
                    ));
        }
    }
}
