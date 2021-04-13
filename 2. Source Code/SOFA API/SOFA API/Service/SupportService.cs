using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.ViewModel.Support;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class SupportService
    {
        private static SupportService instance;

        public static SupportService Instance
        {
            get
            {
                if (instance == null) instance = new SupportService();
                return instance;
            }
            private set
            {
                instance = value;
            }
        }

        public SupportService()
        {
        }

        /// <summary>
        /// Function to create new support request
        /// </summary>
        /// <param name="request"></param>
        /// <returns>A new support request</returns>
        public SupportRequestViewModelOut CreateSupportRequest(SupportRequestViewModelIn request)
        {
            SupportRequestViewModelOut newRequest = null;
            try
            {
                newRequest = SupportDAO.Instance.CreateSupportRequest(request);
                if (newRequest != null)
                {
                    newRequest.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    newRequest = new SupportRequestViewModelOut();
                    newRequest.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Request support failed!");
                }
            }
            catch (Exception e)
            {
                newRequest = new SupportRequestViewModelOut();
                newRequest.ErrorMessage = e.ToString();
                newRequest.Code = Const.REQUEST_CODE_FAILED;
            }
            return newRequest;
        }

        /// <summary>
        /// Funtion to get support request
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="requestType"></param>
        /// <returns>A support request</returns>
        public SupportRequestViewModelOut GetSupportRequest(int userId, int requestType)
        {
            SupportRequestViewModelOut request = null;
            try
            {
                request = SupportDAO.Instance.GetSupportRequest(userId, requestType);
                if (request != null)
                {
                    request.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                }
                else
                {
                    request = new SupportRequestViewModelOut();
                    request.Code = Const.REQUEST_CODE_FAILED;
                    throw new Exception("Get request support failed!");
                }
            }
            catch (Exception e)
            {
                request = new SupportRequestViewModelOut();
                request.ErrorMessage = e.ToString();
                request.Code = Const.REQUEST_CODE_FAILED;
            }
            return request;
        }

        public SupportRequestViewModelOut CheckFashionista(int userId)
        {
            SupportRequestViewModelOut support = new SupportRequestViewModelOut();
            try
            {
                support.isFashionista = SupportDAO.Instance.CheckFashionista(userId);
                support.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                support.ErrorMessage = e.ToString();
                support.Code = Const.REQUEST_CODE_FAILED;
            }
            return support;
        }
    }
}
