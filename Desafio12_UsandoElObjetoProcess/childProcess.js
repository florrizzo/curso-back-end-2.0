process.on("message", (father) => {
    if(father.msg == "start"){
        let sum = 0
        let length = 100000000;
        if(father.cant){
            length = father.cant;
        }
        for(let i = 0; i < length; i++){
            let random = Math.floor(Math.random() * 999 + 1)
            sum += random;
        }
        process.send({type: "sum", data: sum})
    }
})