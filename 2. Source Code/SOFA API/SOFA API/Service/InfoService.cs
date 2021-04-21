﻿using SOFA_API.Common;
using SOFA_API.DAO;
using SOFA_API.DTO;
using SOFA_API.ViewModel.Info;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.Service
{
    public class InfoService
    {
        private static InfoService instance;
        public static InfoService Instance
        {
            get
            {
                if (InfoService.instance == null) InfoService.instance = new InfoService();
                return InfoService.instance;
            }
            private set
            {
                InfoService.instance = value;
            }
        }
        /// <summary>
        /// Service of controller get all info
        /// </summary>
        /// <returns>InfoViewModelOut</returns>
        public InfoViewModelOut GetAllInfo()
        {
            InfoViewModelOut infoViewModelOut = new InfoViewModelOut();
            try
            {
                List<Info> infos = InfoDAO.Instance.GetAllInfo();
                foreach (Info item in infos)
                {
                    infoViewModelOut.ListInfo.Add(new InfoModelOut(item));
                }
                infoViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                infoViewModelOut.ErrorMessage = e.ToString();
            }

            return infoViewModelOut;
        }

        internal InfoViewModelOut Delete(int infoID, int userID)
        {
            InfoViewModelOut infoViewModelOut = new InfoViewModelOut();
            try
            {
                Info info = InfoDAO.Instance.GetInfoByID(infoID);
                if (info != null && info.ID > 0)
                {
                    if (info.AccountID == userID)
                    {
                        int res = InfoDAO.Instance.DeleteInfoByID(infoID);
                        if (res > 0)
                        {
                            infoViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                        }
                        else
                        {
                            infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                        }
                    }
                    else
                    {
                        infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                        infoViewModelOut.ErrorMessage = MessageUtils.ERROR_DONT_HAVE_PERMISSION;
                    }
                }
                else
                {
                    infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                infoViewModelOut.ErrorMessage = e.ToString();
            }

            return infoViewModelOut;
        }

        /// <summary>
        /// Service of get info of user
        /// </summary>
        /// <param name="userID">ID of the user</param>
        /// <returns>Info view model out</returns>
        public InfoViewModelOut GetUserInfo(int userID)
        {
            InfoViewModelOut infoViewModelOut = new InfoViewModelOut();
            try
            {
                List<Info> infos = InfoDAO.Instance.GetInfoOfAccount(userID);
                foreach (Info item in infos)
                {
                    infoViewModelOut.ListInfo.Add(new InfoModelOut(item));
                }
                infoViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                infoViewModelOut.ErrorMessage = e.ToString();
            }

            return infoViewModelOut;
        }

        /// <summary>
        /// Service of create info service
        /// </summary>
        /// <param name="infoViewModelIn"></param>
        /// <returns></returns>
        public InfoViewModelOut CreateInfo(InfoViewModelIn infoViewModelIn)
        {
            InfoViewModelOut infoViewModelOut = new InfoViewModelOut();
            try
            {
                Info info = InfoDAO.Instance.CreateInfo(infoViewModelIn.AccountID, infoViewModelIn.Height, infoViewModelIn.Weight, infoViewModelIn.BustSize, infoViewModelIn.WaistSize, infoViewModelIn.HipSize, infoViewModelIn.SkinColor, infoViewModelIn.Name);
                if (info.ID > 0)
                {
                    InfoModelOut infoModelOut = new InfoModelOut(info);
                    infoViewModelOut.Code = Const.REQUEST_CODE_SUCCESSFULLY;
                    infoViewModelOut.ListInfo.Add(infoModelOut);
                }
                else
                {
                    infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                }
            }
            catch (Exception e)
            {
                Utils.Instance.SaveLog(e.ToString());
                infoViewModelOut.Code = Const.REQUEST_CODE_FAILED;
                infoViewModelOut.ErrorMessage = e.ToString();
            }
            return infoViewModelOut;
        }
    }
}
