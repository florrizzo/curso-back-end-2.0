export default class Perimetro {
  private lado1: number;
  private lado2: number;

    constructor(lado1: number, lado2: number) {
    this.lado1 = lado1;
    this.lado2 = lado2;
  }

  cuadrado(): number {
    let resultado = this.lado1 * 2 + this.lado2 * 2;
    return resultado;
  }

  triangulo(): number {
    return (this.lado1 + this.lado2 + (Math.sqrt(this.lado1^2+this.lado2^2))) / 2;
  }
}
