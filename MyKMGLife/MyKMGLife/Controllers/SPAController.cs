using System;
using System.Web.Mvc;

namespace MyKMGLife.Controllers
{
    public class SPAController : Controller // : BaseController
    {
        // all base level (non-Ajax) requests go through here.  AngularJs will handle routing on the client side
        public ActionResult Index()
        {
            ViewBag.BaseUrl = new Uri(Request.Url, Url.Content("~")).ToString();
            return View("~/Views/Home/Index.cshtml");
        }
    }
}