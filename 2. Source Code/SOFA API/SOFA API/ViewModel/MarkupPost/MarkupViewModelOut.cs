using SOFA_API.ViewModel.BaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SOFA_API.ViewModel.MarkupPost
{
    public class MarkupViewModelOut:BaseModelOut
    {
        public List<MarkupModelOut> ListMarkup { get; set; }

        public MarkupViewModelOut()
        {
            ListMarkup = new List<MarkupModelOut>();
        }

        public MarkupViewModelOut(List<MarkupModelOut> listMarkup)
        {
            ListMarkup = listMarkup;
        }
    }
}
