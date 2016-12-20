using GreenQuiz.Hubs;
using GreenQuiz.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Infrastructure;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Controllers
{
    [Route("api/[controller]")]
    public class QuizSessionController : ApiHubController<QuizHub>
    {
        private IHubContext _contexT;
        private QuizSessionRepository quizSessionRepository;

        private IConnectionManager _connectionManager { get; set; }

        public QuizSessionController(IConnectionManager signalRConnectionManager) : base(signalRConnectionManager)
        {
            quizSessionRepository = new QuizSessionRepository();
        }

        [Route("{sessionid}")]
        [HttpGet]
        public async Task<QuizSession> GetById(string sessionid)
        {
            return await quizSessionRepository.GetById(ObjectId.Parse(sessionid));
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] QuizSession quizSession)
        {
            var res = await quizSessionRepository.Insert(quizSession);
            
            return this.Ok(res);
        }

        [Route("update/{id}")]
        [HttpPost]
        public async Task<IActionResult> Update([FromBody]QuizSession quizSession,string id)
        {
            var res= await Clients.Group(id).UpdateSession(quizSession);

            return Ok(res);

        }
    }
}
