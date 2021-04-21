using System;
using Xunit;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace CalcApi
{
    public class CalcControllerTest
    {
        private readonly static List<CurrencyDTO> list = new List<CurrencyDTO>
            {
                new CurrencyDTO { Curr = "EUR", Rate = 1 }, new CurrencyDTO { Curr = "USD", Rate = 1.4 }, new CurrencyDTO { Curr = "JPY", Rate = 0.1 }
            };
        private readonly static CurrencyListDTO test = new CurrencyListDTO
        {
            List = list,
            Expires = new DateTime(2020, 1, 10)
        };
        private readonly static CurrencyListDTO expired = new CurrencyListDTO
        {
            List = list,
            Expires = new DateTime(2020, 1, 5)
        };
        private readonly static DateTime now = new DateTime(2020, 1, 8);

        [Fact]
        public async void GetLatestCurrencies_ReturnsCurrencyList()
        {
            // Arrange
            var mockStore = new Mock<IMemoryStoreService>();
            var mockNet = new Mock<ICurrencyRetrievalService>();
            var mockSys = new Mock<IIndeterminateService>();
            mockNet.Setup(x => x.Retrieve()).ReturnsAsync(test);

            var controller = new CalcApi.Controllers.CalcController(mockStore.Object, mockNet.Object, mockSys.Object);

            //Act
            var result = await controller.GetLatestCurrencies();

            //Assert
            Assert.True(test.List.SequenceEqual(result.Value.List));
            Assert.Equal(test.Expires, result.Value.Expires);
            mockStore.VerifyGet(x => x.value);
            mockStore.VerifySet(x => x.value = It.IsAny<CurrencyListDTO>());
        }

        [Fact]
        public async void GetLatestCurrencies_StoredNotExpired_ReturnsStored()
        {
            // Arrange
            var mockStore = new Mock<IMemoryStoreService>();
            mockStore.SetupGet(x => x.value).Returns(test);
            var mockNet = new Mock<ICurrencyRetrievalService>();
            var mockSys = new Mock<IIndeterminateService>();
            mockSys.SetupGet(x => x.Now).Returns(now);

            var controller = new CalcApi.Controllers.CalcController(mockStore.Object, mockNet.Object, mockSys.Object);

            //Act
            var result = await controller.GetLatestCurrencies();

            //Assert
            mockStore.VerifyGet(x => x.value);
            mockNet.Verify(x => x.Retrieve(), Times.Never());
            mockStore.VerifySet(x => x.value = It.IsAny<CurrencyListDTO>(), Times.Never());
        }

        [Fact]
        public async void GetLatestCurrencies_StoredExpired_RetrievesNew()
        {
            // Arrange
            var mockStore = new Mock<IMemoryStoreService>();
            mockStore.SetupGet(x => x.value).Returns(expired);
            var mockNet = new Mock<ICurrencyRetrievalService>();
            mockNet.Setup(x => x.Retrieve()).ReturnsAsync(test);
            var mockSys = new Mock<IIndeterminateService>();
            mockSys.SetupGet(x => x.Now).Returns(now);

            var controller = new CalcApi.Controllers.CalcController(mockStore.Object, mockNet.Object, mockSys.Object);

            //Act
            var result = await controller.GetLatestCurrencies();

            //Assert
            mockStore.VerifyGet(x => x.value);
            mockNet.Verify(x => x.Retrieve());
            mockStore.VerifySet(x => x.value = It.IsAny<CurrencyListDTO>());
            Assert.Equal(test.Expires, result.Value.Expires);
        }

        [Fact]
        public async void GetLatestCurrencies_OnException_ReturnsErrorMessage()
        {
            // Arrange
            const string ERROR = "test error";
            var mockStore = new Mock<IMemoryStoreService>();
            var mockNet = new Mock<ICurrencyRetrievalService>();
            mockNet.Setup(x => x.Retrieve()).ThrowsAsync(new Exception(ERROR));
            var mockSys = new Mock<IIndeterminateService>();

            var controller = new CalcApi.Controllers.CalcController(mockStore.Object, mockNet.Object, mockSys.Object);

            //Act
            var result = await controller.GetLatestCurrencies();

            //Assert
            Assert.Equal(ERROR, result.Value.Error);
            Assert.Null(result.Value.List);
            Assert.Null(result.Value.Expires);
        }
    }
}
