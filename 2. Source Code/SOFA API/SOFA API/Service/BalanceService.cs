﻿using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel;
using SOFA_API.ViewModel.Balance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class BalanceService
    {
        public static BalanceService instance;
        public static BalanceService Instance
        {
            get
            {
                if (instance == null) instance = new BalanceService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public BalanceService()
        {
        }
        /// <summary>
        /// Get Balance By Account ID
        /// </summary>
        /// <param name="modelIn">
        /// This param require fields: AccountID
        /// </param>
        /// <returns></returns>
        public GetBalanceViewModelOut GetBalanceByAccountID(GetBalanceViewModelIn modelIn)
        {
            GetBalanceViewModelOut balance = BalanceDAO.Instance.GetBalanceByAccountID(modelIn);
            if (balance != null)
            {
                balance.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                balance = new GetBalanceViewModelOut();
                balance.Code = Const.REQUEST_CODE_FAILED;
            }
            return balance;
        }
        /// <summary>
        /// Get TransactionHistory By Account ID
        /// </summary>
        /// <param name="modelIn">
        /// This param require fields: AccountID
        /// </param>
        /// <returns></returns>
        public ListTransactionViewModelOut GetTransactionHistory(GetBalanceViewModelIn modelIn)
        {
            ListTransactionViewModelOut viewModelOut = BalanceDAO.Instance.GetAllHistoryTransaction(modelIn);
            if (viewModelOut != null)
            {
                viewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                viewModelOut = new ListTransactionViewModelOut();
                viewModelOut.Code = Const.REQUEST_CODE_FAILED;
            }
            return viewModelOut;
        }
        /// <summary>
        /// TopUp Account by admin
        /// </summary>
        /// <param name="topUpAccountModelIn">
        /// This param require fields: AccountId , AdminId , Amount , Description
        /// </param>
        /// <returns></returns>
        public TopUpAccountModelOut topUpAccount(TopUpAccountModelIn topUpAccountModelIn)
        {
            TopUpAccountModelOut topUpAccountModelOut = new TopUpAccountModelOut();
            int result = 0;
            result = BalanceDAO.Instance.TopUpAccount(topUpAccountModelIn);
            if (result > 0)
            {
                topUpAccountModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                topUpAccountModelOut.AccountId = topUpAccountModelIn.AccountId;
                topUpAccountModelOut.AdminId = topUpAccountModelIn.AdminId;
                topUpAccountModelOut.Amount = topUpAccountModelIn.Amount;
                topUpAccountModelOut.Description = topUpAccountModelIn.Description;
            }
            else
            {
                topUpAccountModelOut.Code = Const.REQUEST_CODE_FAILED;
                topUpAccountModelOut.ErrorMessage = MessageUtils.ERROR_TOPUP_FAILED;
            }
            return topUpAccountModelOut;
        }
    }
}
