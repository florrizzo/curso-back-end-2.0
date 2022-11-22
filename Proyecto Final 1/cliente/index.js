//Setting our host URL as a constant for easy reference
const URL = "https://pokeapi.co/api/v2/pokemon/ditto"
//We will probably not talk much about options this article, but here is an example one
const options = {
      method: 'get',
      headers: { "Content-Type": "application/json" },
      mode: 'no-cors',
    //   body: JSON.stringify({ dataKey1: "test", dataKey2: "test" }),
    };

//This is the actual series of functions for a fetch request. 
//However, the above options and URL are just examples of possible text
//This series of code would actually be inneffective in practice 
//so we are focusing on the structure rather than specific content.
// "https://pokeapi.co/api/v2/pokemon/ditto"

fetch("http://localhost:8080/api/productos", options)
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
    .catch((err) => {
        console.log(err);
    })

