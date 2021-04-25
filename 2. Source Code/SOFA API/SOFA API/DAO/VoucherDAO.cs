using SOFA_API.Common;
using SOFA_API.DTO;
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
        public Voucher AddVoucher(AddVoucherViewModelIn addVoucher)
        {
            Voucher data = null;
            string sql = "EXEC dbo.addVoucher @Title , @Code , @Content , @Description , @Image , @FromDate , @ToDate , @IsExpress , @Quantity";
            try
            {
                int isExpress = (DateTime.Compare(DateTime.Now, addVoucher.ToDate) < 0) ? 0 : 1;
                DataTable res = DataProvider.Instance.ExecuteQuery(sql, new object[] { addVoucher.Title, addVoucher.Code, addVoucher.Content, addVoucher.Description, addVoucher.Image, addVoucher.FromDate, addVoucher.ToDate, isExpress, addVoucher.Quantity });
                if (res.Rows.Count > 0)
                {
                    data = new Voucher(res.Rows[0]);
                }
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
        public int UseVoucher(int accountId, AddVoucherViewModelIn voucher)
        {
            int data = 0;
            string sql = "EXEC dbo.UseVoucher @AccountID , @VoucherID ";
            try
            {
                data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { accountId, voucher.Id });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return data; ;
        }

        public List<AdminVoucherModelOut> GetAllVoucher()
        {
            List<AdminVoucherModelOut> list = new List<AdminVoucherModelOut>();
            string sql = "EXEC dbo.[GetAllVoucher]";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { });
                if (data.Rows.Count > 0)
                {
                    foreach (DataRow row in data.Rows)
                    {
                        list.Add(new AdminVoucherModelOut(row));
                    }
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return list; ;
        }

        public void DeleteVoucher(int voucherId)
        {
            string sql = "EXEC dbo.DeleteVoucher @VoucherId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { voucherId });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
        }

        public VoucherDetaiForUserViewModelOut GetVoucherById(int voucherId)
        {
            VoucherDetaiForUserViewModelOut viewModelOut = new VoucherDetaiForUserViewModelOut();
            string sql = "EXEC dbo.GetVoucherById @VoucherId";
            try
            {
                DataTable data = DataProvider.Instance.ExecuteQuery(sql, new object[] { voucherId });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return viewModelOut;
        }
        public int UpdateVoucherImage(int voucherID, string imageURL)
        {
            int res = 0;

            string sql = "EXEC UpdateVoucherImage @voucherID , @imageURL";
            res = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { voucherID, imageURL });

            return res;
        }

    }
}
