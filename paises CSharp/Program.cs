using Newtonsoft.Json;
using System.Net;

namespace paises_Csharp
{
    class Program
    {
        static void Main(string[] args)
        {
            bool rodando = true;
            Console.WriteLine("Bem-vindo ao buscador de países!");
            do
            {
                int num = showData();
                if (num == 0)
                {
                    rodando = false;
                }
            } while (rodando == true);

            Console.WriteLine("\nPrograma Encerrado!");
        }

        static int showData()
        {
            Console.WriteLine($"\nDigite o nome de um país ou 0 para sair.");
            string pais = Console.ReadLine();
            if (pais == "0")
            {
                return 0;
            }
            else
            {

                var json = GetJSON(pais);
                if (json != null)
                {
                    var data = JsonConvert.DeserializeObject<dynamic>(json);
                    var paisBuscado = data[0];
                    var nome = paisBuscado.name.common;
                    var sigla = paisBuscado.cioc;
                    var moedas = paisBuscado.currencies;
                    var capitais = paisBuscado.capital;
                    var regiao = paisBuscado.region;
                    var subregiao = paisBuscado.subregion;
                    var linguas = paisBuscado.languages;
                    var fronteiras = paisBuscado.borders;
                    var area = string.Format("{0:n}", paisBuscado.area);
                    var populacao = string.Format("{0:n}", paisBuscado.population);

                    int ca = 1;
                    int f = 1;
                    int m = 1;
                    int l = 1;

                    Console.WriteLine($"\nNome: {nome} ({sigla})");
                    Console.WriteLine($"População: {populacao}");
                    foreach (string capital in capitais)
                    {
                        Console.WriteLine($"Capital {ca}: {capital}");
                        ca++;
                    }
                    Console.WriteLine($"Regiao: {regiao}");
                    Console.WriteLine($"Sub-Região: {subregiao}");
                    foreach (dynamic moeda in moedas)
                    {
                        Console.WriteLine($"Moeda {m}: {moeda.Value.name}");
                        m++;
                    }

                    foreach (dynamic lingua in linguas)
                    {
                        Console.WriteLine($"Língua {l}: {lingua.Value.Value}");
                        l++;
                    }


                    if (fronteiras != null)
                    {
                        foreach (string fronteira in fronteiras)
                        {
                            Console.WriteLine($"Fronteira {f}: {fronteira}");
                            f++;
                        }
                        Console.WriteLine($"Area: {area}");
                    }
                    return 1;
                }
                else
                {
                    Console.WriteLine("Este país não existe!");
                    return 1;
                }
            }
        }

        static string GetJSON(string pais)
        {
            var request = WebRequest.Create($"https://restcountries.com/v3.1/name/{pais}");

            request.Method = "GET";
            try
            {
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
                else
                {
                    return null;
                }

            }
            catch (System.Exception)
            {
                return null;
            }

        }
    }
}


