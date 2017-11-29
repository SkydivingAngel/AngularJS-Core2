namespace AngularJsCore.Controllers
{
    using Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Configuration;
    using System.Collections.Generic;

    public class ValuesController : Controller
    {
        private readonly IConfiguration configuration;
        private readonly HttpContext httpContext;

        private List<Prodotto> products = new List<Prodotto>
        {
            new Prodotto
            {
                Nome= "Cioccolata Core",
                Descrizione= "Marca: Perugina",
                Quantita = 72,
                Prezzo = 5.4
            },
            new Prodotto
            {
                Nome= "Pasta Core",
                Descrizione= "Marca: Barilla",
                Quantita= 54,
                Prezzo= 1.8
            },
            new Prodotto
            {
                Nome= "Patatine Core",
                Descrizione= "Marca: Pay",
                Quantita= 98,
                Prezzo= 0.80
            },
            new Prodotto
            {
                Nome= "Cioccolata 002",
                Descrizione= "Marca: Perugina",
                Quantita = 72,
                Prezzo = 5.4
            },
            new Prodotto
            {
                Nome= "Pasta 002",
                Descrizione= "Marca: Barilla",
                Quantita= 54,
                Prezzo= 1.8
            },
            new Prodotto
            {
                Nome= "Patatine 002",
                Descrizione= "Marca: Pay",
                Quantita= 98,
                Prezzo= 0.80
            }
        };

        public ValuesController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet("GetDataById/{id}")]
        public JsonResult GetDataById(int id = 0)
        {
            return Json(products[id]);
        }

        [HttpGet("GetProducts")]
        public JsonResult GetProducts()
        {
            //Thread.Sleep(500);
            return Json(products);
        }

        [HttpPost("CheckLogin")]
        public IActionResult CheckLogin(Login model)
        {
            //Thread.Sleep(500);
            if (model.Username.ToLowerInvariant() =="a" && model.Password.ToLowerInvariant() == "b")
                return  Ok("Logged");
            return BadRequest("Not Logged");
        }

        [HttpGet("GetServerAdress")]
        public JsonResult GetServerAdress()
        {
            return Json(ViewsRedirectRule.SiteAddress);
        }

        [HttpGet("WarmUpCall")]
        public IActionResult WarmUpCall()
        {
            return Ok();
        }
    }
}
