using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class Frage 
    {
        [BsonElement("Titel")]
        public string Titel { get; set; }

        [BsonElement("Antworten")]
        public List<Antwort> Antworten { get; set; }

        [BsonElement("RichtigeAntwort")]
        public int RichtigeAntwort { get; set; }
    }
}
