// Promesa

laPromesaDeMiEx(253)
    .catch((err => {
        console.log('No cumplio con su promesa');
    }))
    .then((res) => {
        console.log('Casorio');
    });

// Callback

laPromesaDeMiEx(253, ((err, res) => {
    if (err){
        console.log('No cumplio con su promesa');
    } 
    if (res){
        console.log('Casorio');
    }
}));

// Fetch - Es una promesa que pide data a una url

fetch('url')
    .then((res) => res.json())
    .then((json) => {
        console.log(json);
    })
    .catch((err) => {
        console.log(err);
    })


