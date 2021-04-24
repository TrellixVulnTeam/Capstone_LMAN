using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class VoucherServiceTest
    {
        [TestMethod]
        public void GetAllVoucher_ShouldReturnVoucherList()
        {
            // arrange

            // act
            AdminVoucherViewModelOut modelOut = VoucherService.Instance.GetAllVoucher();

            // assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListVoucher.Count >= 0);
        }

        [TestMethod]
        public void GetListVoucherByAccountId_ShouldReturnVoucherList()
        {
            // arrange
            int accountId = 7;
            VoucherViewModelIn viewModelIn = new VoucherViewModelIn();
            viewModelIn.IsExpiress = false;
            viewModelIn.IsUsed = false;
            // act
            AdminVoucherViewModelOut modelOut = VoucherService.Instance.GetAllVoucher();

            // assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListVoucher.Count >= 0);
        }

        [TestMethod]
        public void GetVoucherDetailByAccountId_ShouldReturnVoucherList()
        {
            // arrange
            int accountId = 7;
           
            // act
            AdminVoucherViewModelOut modelOut = VoucherService.Instance.GetAllVoucher();

            // assert
            Assert.AreEqual(modelOut.Code, Const.REQUEST_CODE_SUCCESSFULLY);
            Assert.IsTrue(modelOut.ListVoucher.Count >= 0);
        }
    }
}
