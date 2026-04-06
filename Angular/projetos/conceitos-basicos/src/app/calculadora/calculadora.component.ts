import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculadora',
  imports: [FormsModule],
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.scss'
})
export class CalculadoraComponent {
  n1: number = 0;
  n2: number = 0;
  n3: number = 0;
  resultado: number = 0;

  CalcularMedia(){
    this.resultado = parseFloat(((this.n1 + this.n2 + this.n3) / 3).toFixed(2));
  }

}
