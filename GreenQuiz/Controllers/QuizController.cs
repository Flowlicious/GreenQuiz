using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GreenQuiz.Models;
using GreenQuiz.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GreenQuiz.Controllers
{
    [Route("api/[controller]")]
    public class QuizController : ApiHubController<QuizHub>
    {
        private IHubContext _context;
        QuizRepository quizRepository;

        private IConnectionManager _connectionManager { get; set; }

        public QuizController(IConnectionManager signalRConnectionManager) : base(signalRConnectionManager)
        {
            quizRepository = new QuizRepository();
            // _context = connectionManager.GetHubContext<QuizHub>();
        }

        //public QuizController(IConnectionManager connectionManager)
        //{
        //    quizRepository = new QuizRepository();
        //    _context = connectionManager.GetHubContext<QuizHub>();
        //}

        [Route("{personid}")]
        [HttpGet]
        public async Task<List<Quiz>> GetByPerson(string personid)
        {
            try
            {
                return await quizRepository.GetByPerson(personid);
                // return Ok(res);
            }
            catch (Exception ex)
            {
                throw ex;
                //  return BadRequest(ex);
            }

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Quiz quiz)
        {
            var res = await quizRepository.Insert(quiz);

            await Clients.Group(quiz.PersonId).AddQuiz(quiz);

            //_context.Clients.Group(Constants.QuizChannel).publishQuiz(quiz);

            return this.Ok(res);
        }

        //[HttpPost]
        //public void Post([FromBody] Quiz quiz)
        //{

        //}
    }
}
