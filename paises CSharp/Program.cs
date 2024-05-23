using paises_CSharp.Models;
using paises_CSharp.Services;
using System.Collections.Generic;

    
CountryDataService countryDataService = new CountryDataService();
await countryDataService.GenerateCountryDataFilesAsync();
Console.WriteLine("Country data files generated.");

    

