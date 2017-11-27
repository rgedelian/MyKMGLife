using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KMGGames.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Quiz(int id)
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }
    }
}