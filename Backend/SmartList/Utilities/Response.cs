using System.Runtime.Serialization;

namespace SmartList.Utilities
{
    public class Response<T>
    {
        public T Data { get; init; }
        public bool Success { get; init; } = true;
        public List<string> Messages { get; init; } = new();

        public static Response<T> Failed(params string[] messages)
        {
            return new Response<T>() 
            { 
                Success = false,
                Messages = messages.ToList() 
            };
        }

        public static Response<T> Succeeded(T data)
        {
            return new Response<T>() 
            { 
                Data = data 
            };
        }

    }
}
