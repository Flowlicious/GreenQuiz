using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class QuizSession : EntityBase
    {
        [BsonElement("Quiz")]
        public Quiz Quiz { get; set; }

        [BsonElement("ChallengerId")]
        public string ChallengerId { get; set; }

        [BsonElement("Player1")]
        public Player Player1 { get; set; }

        [BsonElement("Player2")]
        public Player Player2 { get; set; }

        [BsonElement("Winner")]
        public Player Winner { get; set; }


    }
}
