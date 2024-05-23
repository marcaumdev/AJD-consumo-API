using paises_CSharp.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace paises_CSharp.Services
{
    public class CountryDataService
    {
        public async Task GenerateCountryDataFilesAsync()
        {

            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    string apiUrl = "https://restcountries.com/v3.1/all";

                    HttpResponseMessage response = await httpClient.GetAsync(apiUrl);

                    response.EnsureSuccessStatusCode();
                    string jsonContent = await response.Content.ReadAsStringAsync();

                    var countries = JsonSerializer.Deserialize<Country[]>(jsonContent);

                    foreach (var country in countries)
                    {
                        string fileName = $"{country.Name}.txt";


                        using (StreamWriter writer = File.CreateText(fileName))
                        {
                            writer.WriteLine($"Name: {country.Name}");
                            //writer.WriteLine($"Region: {country.Info.Region}");
                            //writer.WriteLine($"Subregion: {country.Info.Subregion}");
                            //writer.WriteLine($"Latlng: {string.Join(", ", country.Info.LatLng)}");
                            //writer.WriteLine($"Area: {country.Info.Area}");
                            //writer.WriteLine($"Population: {country.Info.Population}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error: {ex.Message}");
                }
            }
        }
    }
}
