using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Voucher;
using System;
using System.Collections.Generic;
using System.IO;
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
            try
            {
                AddVoucherViewModelIn model = modelIn;
                model.Image = "";
                Voucher result = VoucherDAO.Instance.AddVoucher(model);
                if (result != null && result.Id > 0)
                {
                    string filename = result.Id + ".png";
                    string path = Const.ASSETS_PATH_VOUCHER_IMAGE;
                    string imageContent = modelIn.Image;
                    Utils.Instance.SaveImageFromBase64String(imageContent, path, filename);
                    string imageUrl = Path.Combine(path, filename);
                    int res = VoucherDAO.Instance.UpdateVoucherImage(result.Id, imageUrl);
                    if (res > 0)
                    {
                        result.Image = imageUrl;
                    }
                    modelOut.Voucher = result;
                    modelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    modelOut.Code = Const.REQUEST_CODE_FAILED;
                    modelOut.ErrorMessage = MessageUtils.ERROR_ADD_VOUCHER_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                modelOut.Code = Const.REQUEST_CODE_FAILED;
                modelOut.ErrorMessage = e.ToString();
            }
            return modelOut;
        }

        /// <summary>
        /// Get List Voucher of once account by IsExpiress, IsUsed
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: AccountId , IsExpiress , IsUsed
        /// </param>
        /// <returns></returns>
        public ListVoucherViewModelOut GetListVoucherByAccountID(int accountId, VoucherViewModelIn viewModelIn)
        {
            ListVoucherViewModelOut listVouchers = VoucherDAO.Instance.GetListVoucherByAccountID(accountId, viewModelIn);
            if (listVouchers != null)
            {
                listVouchers.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                listVouchers = new ListVoucherViewModelOut();
                listVouchers.Code = Const.REQUEST_CODE_FAILED;
            }
            return listVouchers;
        }
        /// <summary>
        ///Get Detail Voucher for User
        /// </summary>
        /// <param name="viewModelIn">
        /// This param require fields: ID, AccountId
        /// </param>
        /// <returns></returns>
        public VoucherDetaiForUserViewModelOut GetVoucherDetailByAccountId(int accountId, VoucherDetaiForUserViewModelIn viewModelIn)
        {
            VoucherDetaiForUserViewModelOut viewModelOut = VoucherDAO.Instance.GetVoucherDetailByAccountId(accountId, viewModelIn);
            if (viewModelOut != null)
            {
                viewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                viewModelOut = new VoucherDetaiForUserViewModelOut();
                viewModelOut.Code = Const.REQUEST_CODE_FAILED;
            }
            return viewModelOut;
        }

        public AddVoucherViewModelOut UseVoucher(int accountId, AddVoucherViewModelIn modelIn)
        {
            AddVoucherViewModelOut modelOut = new AddVoucherViewModelOut();
            int result = VoucherDAO.Instance.UseVoucher(accountId, modelIn);
            if (result > 0)
            {
                modelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            else
            {
                modelOut.Code = Const.REQUEST_CODE_FAILED;
            }
            return modelOut;
        }

        public AdminVoucherViewModelOut GetAllVoucher()
        {
            AdminVoucherViewModelOut listVouchers = new AdminVoucherViewModelOut();
            try
            {
                listVouchers.ListVoucher = VoucherDAO.Instance.GetAllVoucher();

                listVouchers.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listVouchers.Code = Const.REQUEST_CODE_FAILED;
                listVouchers.ErrorMessage = e.Message;
            }
            return listVouchers;
        }

        public AdminVoucherViewModelOut DeleteVoucher(int voucherId)
        {
            AdminVoucherViewModelOut listVouchers = new AdminVoucherViewModelOut();
            try
            {
                VoucherDetaiForUserViewModelOut viewModelOut = VoucherDAO.Instance.GetVoucherById(voucherId);

                if (viewModelOut != null)
                {
                    VoucherDAO.Instance.DeleteVoucher(voucherId);
                    listVouchers.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                    throw new Exception("Voucher không tồn tại");
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                listVouchers.Code = Const.REQUEST_CODE_FAILED;
                listVouchers.ErrorMessage = e.Message;
            }
            return listVouchers;
        }
    }
}
