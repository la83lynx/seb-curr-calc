using System;
using Xunit;
using Moq;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Linq;

namespace CalcApi
{
    public class CurrencyRetrieveServiceTest
    {
        public const string OK_XML = @"<gesmes:Envelope xmlns:gesmes='http://www.gesmes.org/xml/2002-08-01' xmlns='http://www.ecb.int/vocabulary/2002-08-01/eurofxref'>
            <gesmes:subject>Reference rates</gesmes:subject>
            <gesmes:Sender>
            <gesmes:name>European Central Bank</gesmes:name>
            </gesmes:Sender>
            <Cube>
                <Cube time='2020-01-01'>
                    <Cube currency='USD' rate='1.2051'/>
                    <Cube currency='JPY' rate='130.64'/>
                    <Cube currency='BGN' rate='1.9558'/>
                    <Cube currency='CZK' rate='25.903'/>
                </Cube>
            </Cube>
        </gesmes:Envelope>";

        public const string BAD_XML = "this is inv@lid";

        [Fact]
        public void TestParse_GoodXml_ReturnsGoodValue()
        {
            //Arrange
            var mockCfg = new Mock<IConfiguration>();
            var service = new CurrencyRetrievalService(mockCfg.Object);

            //Act
            var result = service.Parse(OK_XML);

            //Assert
            Assert.NotNull(result.List);
            Assert.Equal(5, result.List.Count()); //with EUR
        }

        [Fact]
        public void TestParse_BadXml_Throws()
        {
            //Arrange
            var mockCfg = new Mock<IConfiguration>();
            var service = new CurrencyRetrievalService(mockCfg.Object);

            //Act, Assert
            Assert.Throws<System.Xml.XmlException>(() => service.Parse(BAD_XML));
        }
    }
}
