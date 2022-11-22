const numberGenerator = (num:number) => {
    return (Math.random()*num).toFixed(0)
} 

const RGB = () => {
    const color = `(${numberGenerator(255)},${numberGenerator(255)},${numberGenerator(255)})`
    return `RGB${color}`
}

console.log(RGB())
console.log(RGB())