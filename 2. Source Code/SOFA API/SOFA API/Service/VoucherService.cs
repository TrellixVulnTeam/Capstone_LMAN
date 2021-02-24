﻿using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class VoucherService
    {
        public static VoucherService instance;
        public static VoucherService Instance
        {
            get
            {
                if (instance == null) instance = new VoucherService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }
        public VoucherService()
        {
        }
        /// <summary>
        /// Add Voucher by admin
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: Title, Image, code, Description, Content, Fromdate, ToDate, Quantity
        /// if Quantity unlimited , Quantity =-1
        ///   eg: { "Title": "title 1", "Image": "aqbcd","code" :"ABCD", "Description":"Description","Content": "Content","Fromdate":"2019-07-26T00:00:00", "ToDate": "2019-07-26T00:00:00", "Quantity": -1}
        /// </param>
        /// <returns></returns>
        public AddVoucherViewModelOut AddVoucher(AddVoucherViewModelIn modelIn)
        {
            AddVoucherViewModelOut modelOut = new AddVoucherViewModelOut();
            int result = VoucherDAO.Instance.AddVoucher(modelIn);
            if (result > 0)
            {
                modelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                modelOut.Code = Const.REQUEST_CODE_FAILED;
                modelOut.ErrorMessage = MessageUtils.ERROR_ADD_VOUCHER_FAILED;
            }
            return modelOut;
        }

        /// <summary>
        /// Get List Voucher of once account by IsExpiress, IsUsed
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: AccountId , IsExpiress , IsUsed
        /// eg: { "AccountID": 9,  "IsExpiress": true, "IsUsed": false}
        /// </param>
        /// <returns></returns>
        public ListVoucherViewModelOut GetListVoucherByAccountID(VoucherViewModelIn viewModelIn)
        {
            ListVoucherViewModelOut listVouchers = VoucherDAO.Instance.GetListVoucherByAccountID(viewModelIn);
            if (listVouchers != null)
            {
                listVouchers.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                listVouchers.Code = Const.REQUEST_CODE_FAILED;
            }
            return listVouchers;
        }
        /// <summary>
        ///Get Detail Voucher for User
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: ID, AccountId
        ///eg: { "ID":11,  "AccountId":9 }
        /// </param>
        /// <returns></returns>
        public VoucherDetaiForUserViewModelOut GetVoucherDetailByAccountId(VoucherDetaiForUserViewModelIn viewModelIn)
        {
            VoucherDetaiForUserViewModelOut viewModelOut = VoucherDAO.Instance.GetVoucherDetailByAccountId(viewModelIn);
            if (viewModelOut != null)
            {
                viewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                viewModelOut.Code = Const.REQUEST_CODE_FAILED;
            }
            return viewModelOut;
        }
    }
}
