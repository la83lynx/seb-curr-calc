using System.Threading.Tasks;
namespace CalcApi
{
  public interface ICurrencyRetrievalService
  {
    Task<CurrencyListDTO> Retrieve();
  }
}