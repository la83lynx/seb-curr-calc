namespace CalcApi
{
  // trivial memory store - powered by server singleton
    public class MemoryStoreService: IMemoryStoreService {
      public CurrencyListDTO value { get; set; }
    }
}