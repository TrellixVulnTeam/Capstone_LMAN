using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.DTO
{
    public class Info
    {
        public int ID { get; set; }
        public int AccountID { get; set; }
        public double Height { get; set; }
        public double Weight { get; set; }
        public double BustSize { get; set; }
        public double WaistSize { get; set; }
        public double HipSize { get; set; }
        public int SkinColor { get; set; }
        public string Name { get; set; }

        public Info()
        {
        }

        public Info(int iD, int accountID, double height, double weight, double bustSize, double waistSize, double hipSize, int skinColor, string name)
        {
            ID = iD;
            AccountID = accountID;
            Height = height;
            Weight = weight;
            BustSize = bustSize;
            WaistSize = waistSize;
            HipSize = hipSize;
            SkinColor = skinColor;
            Name = name;
        }

        public Info(DataRow row)
        {
            ID = (int)row["ID"];
            AccountID = (int)row["AccountID"];
            Height = (double)row["Height"];
            Weight = (double)row["Weight"];
            BustSize = (double)row["BustSize"];
            WaistSize = (double)row["WaistSize"];
            HipSize = (double)row["HipSize"];
            SkinColor = (int)row["SkinColor"];
            Name = row["Name"].ToString();
        }

    }
}
