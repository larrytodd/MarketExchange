using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using SignalRMarketEx.Models;
using SignalRMarketEx.SignalRHubs;
using Newtonsoft.Json;

namespace SignalRMarketEx.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(ItemEntity model)
        {
            if (Request.IsAjaxRequest())
            {
                var context = GlobalHost.ConnectionManager.GetHubContext<MarketExchangeHub>();
                context.Clients.All.updateItems(model);
                return Json(model);
            }
            return View(model);
        }
    }
}
