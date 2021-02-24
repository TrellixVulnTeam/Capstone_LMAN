using SOFA_API.Common;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
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
        public int addVoucher(AddVoucherViewModelIn addVoucher)
        {
            int data = 0;
            string sql = "EXEC dbo.addVoucher @Title , @Code , @Content , @Image , @FromDate , @ToDate , @IsExpress , @Quantity";
            try
            {
                int isExpress = (DateTime.Compare(DateTime.Now, addVoucher.ToDate) < 0) ? 0 : 1;
                data = DataProvider.Instance.ExecuteNonQuery(sql, new object[] { addVoucher.Title, addVoucher.Code, addVoucher.Content, addVoucher.Image, addVoucher.FromDate, addVoucher.ToDate , isExpress, addVoucher.Quantity });
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
            }
            return data; ;
        }

    }
}
