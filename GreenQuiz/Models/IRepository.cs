using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.Linq.Expressions;

namespace GreenQuiz.Models
{
    public interface IRepository<TEntity> where TEntity : EntityBase
    {
        Task<TEntity> Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(ObjectId id);
        //IEnumerable<TEntity> SearchFor(Expression<Func<TEntity, bool>> predicate);
        Task<List<TEntity>> GetAll();
        Task<TEntity> GetById(ObjectId id);

    }
}
