import {Component, OnInit, inject} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Cliente} from './cliente';
import {ClienteService} from '../cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {BrasilapiService} from '../brasilapi.service';
import {Estado, Municipio} from '../brasilapi.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    NgxMaskDirective,
    CommonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipio: Municipio[] = [];

  constructor(
    private service: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit() {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params'];
      const id = params['id'];
      if (id) {
        let clienteEncontrado = this.service.pesquisarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if(this.cliente.uf) {
            const event = {value: this.cliente.uf} as MatSelectChange;
            this.carregarMunicipios(event);
          }
        }
      }
    });
    this.carregarUFs();
  }

  salvar() {
    if (!this.atualizando) {
      this.service.salvar(this.cliente);
      this.cliente = Cliente.newCliente();
      this.mostrarMensagem('Cliente salvo com sucesso!');
    } else {
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mostrarMensagem('Cliente atualizado com sucesso!');
    }
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'Ok', {
      duration: 2000,
    });
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe({
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log('Erro ao carregar estados: ', erro),
    });
  }

  carregarMunicipios(event: MatSelectChange) {
    const ufSelecionada = event.value;
    this.brasilApiService.listarMunicipiosPorUF(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipio = listaMunicipios,
      error: erro => console.log('Erro ao carregar municípios: ', erro),
    });
  }
}
