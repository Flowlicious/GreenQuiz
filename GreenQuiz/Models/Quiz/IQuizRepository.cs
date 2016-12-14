using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Models
{
    public interface IQuizRepository : IRepository<Quiz>
    {
        Task<List<Quiz>> GetByPerson(string personId);
    }
}
