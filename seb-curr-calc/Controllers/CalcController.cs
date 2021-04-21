using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using CalcApi;

#region CalcController
namespace CalcApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalcController : ControllerBase
    {
      private readonly IMemoryStoreService _store;
      private readonly ICurrencyRetrievalService _net;
      private readonly IIndeterminateService _sys;

        public CalcController(IMemoryStoreService store, ICurrencyRetrievalService net, IIndeterminateService sys)
        {
          this._store = store;
          this._net = net;
          this._sys = sys;
        }

        // GET: api/Calc/Latest
        [HttpGet("Latest")]
        public async Task<ActionResult<CurrencyListDTO>> GetLatestCurrencies()
        {
          try
          {
            var result = GetFromStore();
            if (result != null) return result;
            return SaveToStore(await this._net.Retrieve());
          }
          catch (Exception x)
          {
            return new CurrencyListDTO { Error = x.Message };
          }
        }

        private CurrencyListDTO GetFromStore() {
          var stored = _store.value;
          if (stored != null && stored.Expires > this._sys.Now)
            return stored;
          return null;
        }

        private CurrencyListDTO SaveToStore(CurrencyListDTO value) {
          _store.value = value;
          return value;
        }
    }
}
#endregion