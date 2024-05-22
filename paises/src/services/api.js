import axios from 'axios';

function paisesAPI() {
    axios({
        method: "get",
        url: "https://restcountries.com/v3.1/all",
      }).then(function (response) {
          localStorage.setItem("paises", response.json()) 
      });
      
} 

export {paisesAPI}