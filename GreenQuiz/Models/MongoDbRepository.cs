using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq.Expressions;
using MongoDB.Driver.Linq;

namespace GreenQuiz.Models
{
    public class MongoDbRepository<TEntity> : IRepository<TEntity> where TEntity : EntityBase
    {

        //MongoClient _client;
        //MongoServer _server;
        //MongoDatabase _db;

        private IMongoDatabase database;
        private IMongoCollection<TEntity> collection;

        public MongoDbRepository()
        {
            var service = new MongoService<TEntity>();
            database = service.database;
            collection = service.collection;
        }



        public async Task<List<TEntity>> GetAll()
        {
            var filter = new BsonDocument();
            return await collection.Find(filter).ToListAsync();
        }

        public async Task<TEntity> GetById(ObjectId id)
        {
            var filter = Builders<TEntity>.Filter.Eq(f => f.Id, id);
            return await collection.Find(filter).SingleAsync<TEntity>();
        }

        public async Task<TEntity> Insert(TEntity q)
        {
            await collection.InsertOneAsync(q);
            return q;

        }

        public async void Delete(ObjectId id)
        {
            var filter = Builders<TEntity>.Filter.Eq(te => te.Id, id);
            var result = await collection.DeleteOneAsync(filter);
        }

        public async void Update(TEntity entity)
        {
            var filter = Builders<TEntity>.Filter.Eq(te => te.Id, entity.Id);
            await collection.ReplaceOneAsync(filter, entity);
        }

        //public IEnumerable<TEntity> SearchFor(Expression<Func<TEntity, bool>> predicate)
        //{
        //    return collection
        //        .AsQueryable<TEntity>()
        //            .Where(predicate.Compile())
        //                .ToList();
        //}

    }
}
