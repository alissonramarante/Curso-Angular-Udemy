import { Component, OnInit, inject } from '@angular/core';
import { CommonModule} from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlexLayoutModule} from '@angular/flex-layout';
import { FormsModule} from '@angular/forms';
import { MatButton } from "@angular/material/button";
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    FlexLayoutModule,
    FormsModule,
    MatButton,
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent implements OnInit {
  nome: string = '';
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['nome', 'cpf', 'dataNascimento', 'email', 'acoes'];
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisar() {
    this.listaClientes = this.service.pesquisarClientes(this.nome);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id: id } });
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.snack.open('Cliente deletado com sucesso!','Ok');
  }
}
