using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class Antwort 
    {
        [BsonElement("Text")]
        public string Text { get; set; }

 
    }
}
