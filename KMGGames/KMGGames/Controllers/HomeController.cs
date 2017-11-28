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

        [HttpGet]
        public ActionResult Quiz(int id)
        {
            if (id < 1 || id > 15)
            {
                throw new ArgumentException("id is out of range");
            }

            ViewBag.Message = "Your application description page.";

            return View();
        }

        [HttpPost]
        public ActionResult Answer(int id, int a)
        {
            return View();
        }
    }
}