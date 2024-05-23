using Newtonsoft.Json;
using System;
using System.IO;
using System.Net;

namespace paises_Csharp
{
    class Program
    {
        static void Main(string[] args)
        {
            showData();
            Console.ReadKey();
        }

        static void showData()
        {
            Console.WriteLine("Digite o nome de um personagem de rick and morty");
            string nome = Console.ReadLine();
            var json = GetJSON(nome);
            if (json != null)
            {
                var data = JsonConvert.DeserializeObject<dynamic>(json);
                Console.WriteLine($"{data.results}");
                foreach (dynamic temp in data)
                {
                    
                }
            }
            else
            {
                Console.WriteLine("Este personagem não existe!");
            }
        }

        static string GetJSON(string nome)
        {
            var request = WebRequest.Create($"https://rickandmortyapi.com/api/character/?name={nome}");

            request.Method = "GET";
            var response = (HttpWebResponse)request.GetResponse();
            if (response.StatusCode == HttpStatusCode.OK)
            {
                using (var stream = response.GetResponseStream())
                {
                    var reader = new StreamReader(stream);
                    var json = reader.ReadToEnd();
                    return json;
                }
            }
            return null;
        }
    }
}
    

