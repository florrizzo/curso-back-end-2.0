const generarNumero = (num) => {
    return (Math.random()*num).toFixed(0)
}

const colorRGB = () => {
    const color = `(${generarNumero(255)},${generarNumero(255)},${generarNumero(255)})`
    return `RGB${color}`
}

console.log(colorRGB())
console.log(colorRGB())
