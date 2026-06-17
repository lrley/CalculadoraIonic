import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  // 1. VARIABLES (Espacio de memoria de la calculadora)
  pantalla: string = '0';            // Lo que el usuario ve en la pantalla
  operador: string = '';            // Guarda el signo (+, -, *, /)
  primerValor: number | null = null; // Guarda el primer número grande (ej. 12539)
  comenzarNuevoNumero: boolean = false; // Bandera para saber cuándo borrar la pantalla al escribir el segundo número

  constructor() {}

  // 2. FUNCIONES (La lógica que hace funcionar los botones)

  // Se ejecuta cada vez que presionas un número del 0 al 9 o el punto
  presionarNumero(num: string) {
    // Si en la pantalla hay un cero o se acaba de presionar un operador
    if (this.pantalla === '0' || this.comenzarNuevoNumero) {
      this.pantalla = num; // Cambia el valor directamente sin acumular
      this.comenzarNuevoNumero = false; // Apaga la bandera para que los siguientes dígitos se unan
    } else {
      // Evita que el usuario escriba cosas como "5.2.3"
      if (num === '.' && this.pantalla.includes('.')) return;

      this.pantalla += num; // CONCATENA: Une los caracteres (ej: '1' + '2' + '5' para formar '125')
    }
  }

  // Se ejecuta cuando presionas +, -, * o /
  presionarOperador(op: string) {
    this.primerValor = parseFloat(this.pantalla); // Convierte el texto "12539" a número real y lo guarda
    this.operador = op;                          // Almacena el operador seleccionado
    this.comenzarNuevoNumero = true;              // Avisa que el siguiente dígito debe limpiar la pantalla
  }

  // Se ejecuta al presionar el botón de la igualdad "="
  calcular() {
    // Si no hay un operador o un primer valor en memoria, no hace nada
    if (this.operador === '' || this.primerValor === null) return;

    const segundoValor = parseFloat(this.pantalla); // Captura el segundo número actual de la pantalla
    let resultado = 0;

    // Ejecuta la operación matemática correspondiente
    switch (this.operador) {
      case '+':
        resultado = this.primerValor + segundoValor; // Ejemplo: 12539 + 2 = 12541
        break;
      case '-':
        resultado = this.primerValor - segundoValor;
        break;
      case '*':
        resultado = this.primerValor * segundoValor;
        break;
      case '/':
        // Validación básica para no romper la app dividiendo para cero
        resultado = segundoValor !== 0 ? this.primerValor / segundoValor : 0;
        break;
    }

    this.pantalla = resultado.toString(); // Transforma el resultado a texto para mostrarlo en la interfaz
    this.operador = '';                   // Resetea el operador
    this.primerValor = null;              // Resetea el primer valor
    this.comenzarNuevoNumero = true;      // Permite que si tocas otro número inicie una nueva operación
  }

  // Se ejecuta al presionar el botón "C" para limpiar la memoria
  limpiar() {
    this.pantalla = '0';
    this.operador = '';
    this.primerValor = null;
    this.comenzarNuevoNumero = false;
  }

}
