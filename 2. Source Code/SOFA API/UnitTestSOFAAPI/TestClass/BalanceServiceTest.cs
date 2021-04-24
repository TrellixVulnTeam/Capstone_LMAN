using Microsoft.VisualStudio.TestTools.UnitTesting;
using SOFA_API.Common;
using SOFA_API.Service;
using SOFA_API.ViewModel.Balance;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTestSOFAAPI.TestClass
{
    [TestClass]
    public class BalanceServiceTest
    {
        [TestMethod]
        public void GetBalanceByAccountID_ShouldReturnBalance_IfAccountIdIsExist()
        {
            // arrange
            int accountId = 7;

            // Act 
            var result = BalanceService.Instance.GetBalanceByAccountID(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(1600000, result.Balance);
        }

        [TestMethod]
        public void GetBalanceByAccountID_ShouldReturnZero_IfAccountIdDoesNotExist()
        {
            // arrange
            int accountId = -1;

            // Act 
            var result = BalanceService.Instance.GetBalanceByAccountID(accountId);

            // assert
            Assert.AreEqual(null, result.ErrorMessage);
            Assert.AreEqual(0, result.Balance);
        }

        [TestMethod]
        public void GetTransactionHistory_ShouldReturnListTransaction_IfAccountIdExist()
        {
            // arrange
            int accountId = 7;
            int numberOfTransaction = 4;

            // Act 
            var result = BalanceService.Instance.GetTransactionHistory(accountId);

            // assert
            Assert.AreEqual(numberOfTransaction, result.listTransaction.Count);
            Assert.AreEqual(1600000, result.Balance);
        }

        [TestMethod]
        public void GetTransactionHistory_ShouldReturnErrorCode_IfAccountIdDoesNotExist()
        {
            // arrange
            int accountId = -2;
            int numberOfTransaction = 4;

            // Act 
            var result = BalanceService.Instance.GetTransactionHistory(accountId);

            // assert
            Assert.AreEqual(null, result.ErrorMessage);
            Assert.AreEqual(0, result.Balance);
        }

        [TestMethod]
        public void GetTransactionHistory_ShouldReturnErrorCode_IfIdDoesNotExist()
        {
            // arrange
            int accountId = -2;
            int numberOfTransaction = 4;

            // Act 
            var result = BalanceService.Instance.GetTransactionHistory(accountId);

            // assert
            Assert.AreEqual(null, result.ErrorMessage);
            Assert.AreEqual(0, result.Balance);
        }

        [TestMethod]
        public void TopUpAccount_ShouldReturnSuccessfullyCode_IfInputValid()
        {
            // assert
            TopUpAccountModelIn topUpAccountModelIn = new TopUpAccountModelIn(4, 19, 100000, "Admin add topup");

            // Act
            var result = BalanceService.Instance.topUpAccount(topUpAccountModelIn);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(topUpAccountModelIn.Amount, result.Amount);
        }

        [TestMethod]
        public void GetUserBalanceByAccountId_ShouldReturnSuccessfullyCode_IfAccountIdExist()
        {
            // arrang 
            int accountId = 7;
            int listUserbalance = 4;

            // Act 
            var result = BalanceService.Instance.GetUserBalanceByAccountId(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(listUserbalance, result.ListBalance.Count);
        }

        [TestMethod]
        public void GetUserBalanceByAccountId_ShouldReturnSuccessfullyCode()
        {
            // arrang 
            int accountId = 7;
            int listUserbalance = 4;

            // Act 
            var result = BalanceService.Instance.GetUserBalanceByAccountId(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(listUserbalance, result.ListBalance.Count);
        }

        [TestMethod]
        public void GetUserBalance_ShouldReturnSuccessfullyCode()
        {
            // arrang 
            int accountId = 7;
            int listUserbalance = 4;

            // Act 
            var result = BalanceService.Instance.GetUserBalanceByAccountId(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(listUserbalance, result.ListBalance.Count);
        }

        [TestMethod]
        public void GetUserBalance_ShouldReturnListBalance()
        {
            // arrang 
            int accountId = 7;
            int listUserbalance = 4;

            // Act 
            var result = BalanceService.Instance.GetUserBalanceByAccountId(accountId);

            // assert
            Assert.AreEqual(Const.REQUEST_CODE_SUCCESSFULLY, result.Code);
            Assert.AreEqual(listUserbalance, result.ListBalance.Count);
        }

    }
}
