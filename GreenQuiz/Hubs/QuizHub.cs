using GreenQuiz.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GreenQuiz.Hubs
{
    public class QuizHub : Hub<IQuizHub>
    {
        public override Task OnConnected()
        {
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }
        // Server side methods called from client
        public Task Subscribe(string personId)
        {
            return Groups.Add(Context.ConnectionId, personId);
        }

        public Task Unsubscribe(string personId)
        {
            return Groups.Remove(Context.ConnectionId, personId);
        }

        public Task SubscribeToSession(string sessionId)
        {
            return Groups.Add(Context.ConnectionId, sessionId);
        }
        public Task UnsubscribeFromSession(string sessionId)
        {
            return Groups.Remove(Context.ConnectionId, sessionId);
        }
    }
}

public interface IQuizHub
{
    Task AddQuiz(Quiz quiz);
    Task UpdateSession(QuizSession quizSession);
    Task SetConnectionId(string connectionId);
}
