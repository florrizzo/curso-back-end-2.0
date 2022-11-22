export default class Superficie {
  private lado1: number;
  private lado2: number;

    constructor(lado1: number, lado2: number) {
    this.lado1 = lado1;
    this.lado2 = lado2;
  }

  cuadrado(): number {
    return this.lado1 * this.lado2;
  }

  triangulo(): number {
    return ( this.lado1 * this.lado2) / 2;
  }
}