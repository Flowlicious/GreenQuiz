using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public class MongoService<TEntity> where TEntity : EntityBase
    {
        public IMongoDatabase database { get; set; }
        public IMongoCollection<TEntity> collection { get; set; }
        public MongoService()
        {
            this.database = GetDatabase();
            this.collection = GetCollection();
        }


        #region Private Helper Methods
        private IMongoDatabase GetDatabase()
        {
            var client = new MongoClient("mongodb://localhost:27017/QuizDB?safe=true");
            return client.GetDatabase("QuizDB");
        }

        //TODO
        //private string GetConnectionString()
        //{
        //    return ConfigurationManager
        //        .AppSettings
        //            .Get("MongoDbConnectionString")
        //                .Replace("{DB_NAME}", GetDatabaseName());
        //}

        //private string GetDatabaseName()
        //{
        //    return ConfigurationManager
        //        .AppSettings
        //            .Get("MongoDbDatabaseName");
        //}

        private IMongoCollection<TEntity> GetCollection()
        {
            return database
                .GetCollection<TEntity>(typeof(TEntity).Name);
        }
        #endregion
    }
}
