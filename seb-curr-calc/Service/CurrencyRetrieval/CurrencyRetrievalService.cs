using System.Threading.Tasks;
using System.Collections.Generic;
using System.Xml.Linq;
using System;
using Microsoft.Extensions.Configuration;
//using System.Net.Http;
using System.Net;

namespace CalcApi
{
  public class CurrencyRetrievalService: ICurrencyRetrievalService
  {
    private readonly int _refreshHour = 0;

    public CurrencyRetrievalService(IConfiguration cfg)
    {
      int.TryParse(cfg["RefreshHour"], out this._refreshHour);
    }

    public async Task<CurrencyListDTO> Retrieve() {
      // TODO: put url to config
      return Parse(
        (new WebClient()).DownloadString(
          new Uri("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"))
        );
    }

    public CurrencyListDTO Parse(string xmlStr)
    {
      var list = new List<CurrencyDTO>() { new CurrencyDTO { Curr = "EUR", Rate = 1 } };
      var data = XElement.Parse(xmlStr);
      XNamespace ns = data.Attribute("xmlns").Value;
      var cube = data.Element(ns+"Cube").Element(ns+"Cube");
      foreach (var el in cube.Elements())
        list.Add(new CurrencyDTO
          {
            Curr = el.Attribute("currency").Value,
            Rate = double.Parse(el.Attribute("rate").Value)
          }
        );
      return new CurrencyListDTO
        {
          List = list,
          Expires = DateTime
            .ParseExact(cube.Attribute("time").Value,"yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture)
            .AddHours(24 + this._refreshHour)
        };
    }

    // private async Task<string> GetData(string url) {
    //   using (HttpClient client = new HttpClient())
    //   {
    //       var response = await client.GetAsync(url);
    //       if (response.IsSuccessStatusCode)
    //         return await response.Content.ReadAsStringAsync();
    //       else throw new HttpRequestException($"Request to {url} failed with status code {response.StatusCode}: {response.ReasonPhrase}");
    //   }
    // }
  }
}