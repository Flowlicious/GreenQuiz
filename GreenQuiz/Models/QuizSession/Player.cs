using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class Player
    {
        public string DisplayName { get; set; }
        public string PlayerNummer { get; set; }
        public bool IsBeigetreten { get; set; }
        public int Points { get; set; }
    }
}
