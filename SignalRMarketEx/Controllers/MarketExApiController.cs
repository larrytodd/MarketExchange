using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Microsoft.AspNet.SignalR;
using SignalRMarketEx.Models;
using SignalRMarketEx.SignalRHubs;

namespace SignalRMarketEx.Controllers
{
    public class MarketExApiController : ApiController
    {
        //
        [System.Web.Http.HttpGet]
        public List<ItemEntity> Load()
        {
            var itemEntry = new List<ItemEntity>();
            itemEntry.Add(new ItemEntity() { Id = 000, Bid = 25, Description = "initial Item. A filler until we can get persistant store", Ask = 35, LastPrice = 30, Product = "Item 1" });
            return itemEntry;
        }
        [System.Web.Http.HttpPost]
        public ItemEntity Post(string product, string description, decimal ask)
        {
            //Item Entry
            var model = new ItemEntity() { Product = product, Description = description, Ask = ask, Bid=0, LastPrice=0 };
            var context = GlobalHost.ConnectionManager.GetHubContext<MarketExchangeHub>();
            context.Clients.All.updateItems(model);
            return model;
        }
        [System.Web.Http.HttpPost]
        public ItemEntity Post(int id, decimal bid, decimal ask, decimal lastPrice)
        {
            ItemEntity itm = new ItemEntity(id, bid, ask, lastPrice);
            itm.CalculatePrice();
            var context = GlobalHost.ConnectionManager.GetHubContext<MarketExchangeHub>();
            context.Clients.All.updateBidPrice(itm);
            return itm;
        }

    }
}
