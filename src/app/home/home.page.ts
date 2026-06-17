import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  pantalla: string = '0';
  operador: string = '';
  primerValor: number | null = null;
  comenzarNuevoNumero: boolean = false;

  constructor() {}

  presionarNumero(num: string) {
    if (this.pantalla === '0' || this.comenzarNuevoNumero) {
      this.pantalla = num;
      this.comenzarNuevoNumero = false;
    } else {
      if (num === '.' && this.pantalla.includes('.')) return;
      this.pantalla += num;
    }
  }

  presionarOperador(op: string) {
    this.primerValor = parseFloat(this.pantalla);
    this.operador = op;
    this.comenzarNuevoNumero = true;
  }

  // NUEVA FUNCIÓN: Raíz cuadrada (Es directa, no necesita un segundo valor)
  raizCuadrada() {
    const valor = parseFloat(this.pantalla);
    if (valor < 0) {
      this.pantalla = 'Error'; // Evita raíces de números negativos
    } else {
      this.pantalla = Math.sqrt(valor).toString();
    }
    this.comenzarNuevoNumero = true;
  }

  // NUEVA FUNCIÓN: Borra el último número ingresado (←)
  borrarDigito() {
    if (this.pantalla.length > 1) {
      this.pantalla = this.pantalla.slice(0, -1); // Corta el último carácter
    } else {
      this.pantalla = '0';
    }
  }

  // NUEVA FUNCIÓN: Limpia solo la pantalla actual sin borrar la operación guardada (CE)
  limpiarPantalla() {
    this.pantalla = '0';
  }

  calcular() {
    if (this.operador === '' || this.primerValor === null) return;

    const segundoValor = parseFloat(this.pantalla);
    let resultado = 0;

    switch (this.operador) {
      case '+':
        resultado = this.primerValor + segundoValor;
        break;
      case '-':
        resultado = this.primerValor - segundoValor;
        break;
      case '*':
        resultado = this.primerValor * segundoValor;
        break;
      case '/':
        resultado = segundoValor !== 0 ? this.primerValor / segundoValor : 0;
        break;
      case '^':
        resultado = Math.pow(this.primerValor, segundoValor); // POTENCIACIÓN
        break;
    }

    this.pantalla = resultado.toString();
    this.operador = '';
    this.primerValor = null;
    this.comenzarNuevoNumero = true;
  }

  // Limpia todo (C)
  limpiar() {
    this.pantalla = '0';
    this.operador = '';
    this.primerValor = null;
    this.comenzarNuevoNumero = false;
  }
}
