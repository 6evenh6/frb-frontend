import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Usuario, TipoUsuario } from 'app/models/usuarios.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss']
})
export class Usuarios implements OnInit {
  @ViewChild('modalDetalhes') modalDetalhes!: TemplateRef<any>;

  TipoUsuario = TipoUsuario;
  exibirFormulario = false;
  usuarioSelecionado: any = null;

  usuarios: Usuario[] = [];
  displayedUsuarios: Usuario[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 4;

  icones: string[] = [
    'bi-person-fill',
    'bi-person-check-fill',
    'bi-person-badge-fill',
    'bi-person-vcard-fill',
    'bi-person-gear'
  ];
  iconeAtual: string = this.icones[Math.floor(Math.random() * this.icones.length)];

  constructor(public modalService: NgbModal) {}

  ngOnInit(): void {
    this.carregarUsuariosIniciais();
  }

  carregarUsuariosIniciais(): void {
    this.usuarios = [
      {
        id: 1,
        tipo: TipoUsuario.Administrador,
        nome: 'João Admin',
        email: 'joao@empresa.com',
        telefone: '(11) 91234-5678',
        dataCadastro: new Date('2025-01-10'),
        ativo: true,
        observacoes: 'Acesso total ao sistema.'
      },
      {
        id: 2,
        tipo: TipoUsuario.Operador,
        nome: 'Maria Operadora',
        email: 'maria@empresa.com',
        telefone: '(21) 99876-5432',
        dataCadastro: new Date('2025-03-15'),
        ativo: true,
        observacoes: 'Responsável pelos cadastros.'
      }
      // Adicione mais mock se quiser
    ];
    this.collectionSize = this.usuarios.length;
    this.refreshUsuarios();
  }

  refreshUsuarios(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsuarios = this.usuarios.slice(start, end);
  }

  modelo = this.novoModelo();
  novoModelo(): Usuario {
    return {
      tipo: TipoUsuario.Operador,
      nome: '',
      email: '',
      telefone: '',
      dataCadastro: new Date(),
      ativo: true,
      observacoes: ''
    };
  }

  abrirFormulario() {
    this.exibirFormulario = true;
    this.modelo = this.novoModelo();
  }

  cancelar() {
    this.exibirFormulario = false;
    this.modelo = this.novoModelo();
  }

  salvarUsuario(form: NgForm) {
    if (!form.valid) return;

    const novoUsuario = {
      ...this.modelo,
      id: this.usuarios.length > 0
      ? Math.max(...this.usuarios.map(m => m.id!).filter((id): id is number => id !== undefined)) + 1
      : 1
    };

    this.usuarios.unshift(novoUsuario);
    this.collectionSize = this.usuarios.length;
    this.page = 1;
    this.refreshUsuarios();
    this.cancelar();

    Swal.fire({
      icon: 'success',
      title: 'Usuário cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  abrirModalDetalhes(usuario: Usuario): void {
    this.usuarioSelecionado = usuario;
    this.modalService.open(this.modalDetalhes, { size: 'lg', centered: true });
  }

  editarUsuario(usuario: Usuario): void {
    this.modelo = { ...usuario };
    this.exibirFormulario = true;
  }

  excluirUsuario(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não poderá ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios = this.usuarios.filter(m => m.id !== id);
        this.refreshUsuarios();
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}
