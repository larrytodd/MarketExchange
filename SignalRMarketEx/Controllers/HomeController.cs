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
            var itemEntry = new List<ItemEntity>();
            itemEntry.Add(new ItemEntity() { Id=000, Bid=25, Description="initial Item. A filler until we can get persistant store", Ask=35, LastPrice=30, Product="Item 1" });
            return View(itemEntry);
        }
        [HttpPost]
        public ActionResult Index(ItemEntity model)
        {
            return View(model);
        }
        public JsonResult ItemEntry(ItemEntity model)
        {
            //Item Entry
            var context = GlobalHost.ConnectionManager.GetHubContext<MarketExchangeHub>();
            context.Clients.All.updateItems(model);
            return Json(model);
        }
        public JsonResult ItemBid(int id, decimal bid, decimal ask, decimal lastPrice)
        {
            ItemEntity itm = new ItemEntity(id, bid, ask, lastPrice);
            itm.CalculatePrice();
            var context = GlobalHost.ConnectionManager.GetHubContext<MarketExchangeHub>();
            context.Clients.All.updateBidPrice(itm);
            return Json(itm, JsonRequestBehavior.AllowGet);
        }
    }
}
