﻿using SOFA_API.Common;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DAO
{
    public class VoucherDAO
    {
        private static VoucherDAO instance;

        public static VoucherDAO Instance
        {
            get
            {
                if (instance == null) instance = new VoucherDAO();
                return instance;
            }
            private set { instance = value; }
        }
        public VoucherDAO()
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
        public int AddVoucher(AddVoucherViewModelIn addVoucher)
        {
            int data = 0;
            string sql = "EXEC dbo.addVoucher @Title , @Code , @Content , @Description , @Image , @FromDate , @ToDate , @IsExpress , @Quantity";
            try
            {
                int isExpress = (DateTime.Compare(DateTime.Now, addVoucher.ToDate) < 0) ? 0 : 1;
                data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { addVoucher.Title, addVoucher.Code, addVoucher.Content, addVoucher.Description, addVoucher.Image, addVoucher.FromDate, addVoucher.ToDate, isExpress, addVoucher.Quantity });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return data; ;
        }
        /// <summary>
        /// Get List Voucher of once account by IsExpiress, IsUsed
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: AccountId , IsExpiress , IsUsed
        /// eg: { "AccountID": 9,  "IsExpiress": true, "IsUsed": false}
        /// </param>
        /// <returns></returns>
        public ListVoucherViewModelOut GetListVoucherByAccountID(int accountId, VoucherViewModelIn viewModelIn)
        {
            ListVoucherViewModelOut listVoucherOuts = null;
            List<VoucherViewModelOut> listVoucher = new List<VoucherViewModelOut>();
            string sql = "EXEC dbo.getVoucherByAccountID @AccountID , @IsExpires , @IsUsed";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId, viewModelIn.IsExpiress, viewModelIn.IsUsed });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        VoucherViewModelOut voucher = new VoucherViewModelOut(row);
                        listVoucher.Add(voucher);
                    }
                    listVoucherOuts = new ListVoucherViewModelOut(listVoucher);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return listVoucherOuts;
        }
        public VoucherDetaiForUserViewModelOut GetVoucherDetailByAccountId(int accountId, VoucherDetaiForUserViewModelIn viewModelIn)
        {
            VoucherDetaiForUserViewModelOut viewModelOut = null;
            string sql = "EXEC dbo.getVoucherDetailByAccountId @AccountID , @Id";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { accountId, viewModelIn.ID });
                if (data.Rows.Count > 0)
                {
                    viewModelOut = new VoucherDetaiForUserViewModelOut(data.Rows[0]);
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return viewModelOut;
        }

    }
}
