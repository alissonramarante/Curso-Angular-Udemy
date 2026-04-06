import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = '_CLIENTES';

  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  private obterStorage() : Cliente[] {
    const storage = localStorage.getItem(ClienteService.REPO_CLIENTES);

    if(storage){
      const clientes: Cliente[] = JSON.parse(storage);
      return clientes;
    }

    const clientes: Cliente[] = []
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  pesquisarClientes(nomeBusca: string) : Cliente[]{
    const clientes = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }

    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1);

  }
  pesquisarClientePorId(id: string) : Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id);
  }

  atualizar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.forEach(c => {
      if(c.id === cliente.id){
        Object.assign(c, cliente);
      }
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
    });
  }
  deletar(cliente: Cliente){
    const storage = this.obterStorage();


    const index = storage.indexOf(cliente);
    if(index > -1){
      storage.splice(index, 1);
    }
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

}
