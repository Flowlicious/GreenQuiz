using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace GreenQuiz.Models
{
    public abstract class EntityBase
    {
        public ObjectId Id { get; set; }
    }
}
