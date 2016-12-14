using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GreenQuiz.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GreenQuiz.Controllers
{
    [Route("api/[controller]")]
    public class QuizController : Controller
    {

        QuizRepository quizRepository;

        public QuizController()
        {
            quizRepository = new QuizRepository();
        }

        [Route("{personid}")]
        [HttpGet]
        public async Task<IActionResult> GetByPerson(string personid)
        {
            try
            {
                var res = await quizRepository.GetByPerson(personid);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return  BadRequest(ex);
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Quiz quiz)
        {
            var res = await quizRepository.Insert(quiz);
            return this.Ok(res);
        }
    }
}
