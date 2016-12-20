using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class QuizSessionRepository : MongoDbRepository<QuizSession>, IQuizSessionRepository
    {
        private IMongoDatabase database;
        private IMongoCollection<QuizSession> collection;

        public QuizSessionRepository()
        {
            var service = new MongoService<QuizSession>();
            database = service.database;
            collection = service.collection;
        }
    }
}
