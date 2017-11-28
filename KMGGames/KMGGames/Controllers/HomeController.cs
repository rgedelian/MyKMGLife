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
        public ActionResult Answer(int id, string ans)
        {
            ViewBag.QuestionNumber = id;

            switch(id)
            {
                case 1:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    } else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 2:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 3:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 4:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 5:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 6:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 7:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 8:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 9:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 10:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 11:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 12:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 13:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 14:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
                case 15:
                    if (ans == "b")
                    {
                        ViewBag.Correct = "y";
                    }
                    else
                    {
                        ViewBag.Answer = "500 Hz";
                    }
                    break;
            }

            return View();

        }

        [HttpGet]
        public ActionResult End(int id, string ans)
        {
            return View();

        }
    }
}