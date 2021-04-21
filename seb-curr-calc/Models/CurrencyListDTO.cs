using System.Collections.Generic;
using System;

namespace CalcApi {
  public class CurrencyListDTO {
    public IEnumerable<CurrencyDTO> List { get; set; }
    public DateTime? Expires { get; set; }
    public string Error { get; set; }
  }
}