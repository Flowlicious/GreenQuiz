using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class QuizRepository : MongoDbRepository<Quiz>, IQuizRepository
    {
        private IMongoDatabase database;
        private IMongoCollection<Quiz> collection;

        public QuizRepository()
        {
            var service = new MongoService<Quiz>();
            database = service.database;
            collection = service.collection;
        }
        public async Task<List<Quiz>> GetByPerson(string personId)
        {
            var filter = Builders<Quiz>.Filter.Eq(q => q.PersonId, personId);
            return await collection.Find(filter).ToListAsync();
        }
    }
}
