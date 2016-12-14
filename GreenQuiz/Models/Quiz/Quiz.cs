using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GreenQuiz.Models
{
    public class Quiz : EntityBase
    {
        [BsonElement("Titel")]
        public string Titel { get; set; }

        [BsonElement("PersonId")]
        public string PersonId { get; set; }

        [BsonElement("Fragen")]
        public List<Frage> Fragen { get; set; }

    }
}
