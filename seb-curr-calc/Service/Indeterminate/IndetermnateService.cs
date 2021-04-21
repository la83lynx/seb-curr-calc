using System;
namespace CalcApi
{
  public class IndeterminateService: IIndeterminateService
  {
    // also here - Random, Guid, Thread.Sleep
    public DateTime Now { get { return DateTime.Now; } }
  }
}