using SOFA_API.Common;
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
        public AddVoucherViewModelOut addVoucher(AddVoucherViewModelIn modelIn)
        {
            AddVoucherViewModelOut modelOut = new AddVoucherViewModelOut();
            int result = VoucherDAO.Instance.addVoucher(modelIn);
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


        public ListVoucherViewModelOut getListVoucherByAccountID(VoucherViewModelIn viewModelIn)
        {
            ListVoucherViewModelOut listVouchers = VoucherDAO.Instance.getListVoucherByAccountID(viewModelIn);
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
        public VoucherDetaiForUserViewModelOut getVoucherDetailByAccountId(VoucherDetaiForUserViewModelIn viewModelIn)
        {
            VoucherDetaiForUserViewModelOut viewModelOut = VoucherDAO.Instance.getVoucherDetailByAccountId(viewModelIn);
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
