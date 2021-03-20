using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.Info
{
    public class InfoViewModelIn : BaseModelIn
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public double BustSize { get; set; }
        public double WaistSize { get; set; }
        public double HipSize { get; set; }
        public int SkinColor { get; set; }

        public InfoViewModelIn() : base()
        {
        }

        public InfoViewModelIn(int iD, int accountID, double height, double weight, double bustSize, double waistSize, double hipSize, int skinColor) : base()
        {
            ID = iD;
            AccountID = accountID;
            Height = height;
            Weight = weight;
            BustSize = bustSize;
            WaistSize = waistSize;
            HipSize = hipSize;
            SkinColor = skinColor;
        }
        public InfoViewModelIn(DTO.Info info) : base()
        {
            ID = info.ID;
            AccountID = info.AccountID;
            Height = info.Height;
            Weight = info.Weight;
            BustSize = info.BustSize;
            WaistSize = info.WaistSize;
            HipSize = info.HipSize;
            SkinColor = info.SkinColor;
        }
    }
}
