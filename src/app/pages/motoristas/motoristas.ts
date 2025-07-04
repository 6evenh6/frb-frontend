import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motoristas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './motoristas.html',
  styleUrls: ['./motoristas.scss']
})
export class Motoristas implements OnInit {
  @ViewChild('modalDetalhes') modalDetalhes!: TemplateRef<any>;

  exibirFormulario = false;
  motoristaSelecionado: any = null;

  modelo = this.novoModelo();

  motoristas: any[] = [];
  displayedMotoristas: any[] = [];
  collectionSize = 0;
  page = 1;
  pageSize = 4;

  icones: string[] = ['bi-truck', 'bi-person-badge', 'bi-steering-wheel', 'bi-car-front'];
  iconeAtual: string = this.icones[Math.floor(Math.random() * this.icones.length)];

  ngOnInit(): void {
    this.carregarMotoristasIniciais();
  }

  carregarMotoristasIniciais(): void {
    this.motoristas = [
      {
        id: 1,
        nome: 'Carlos Silva',
        cpf: '123.456.789-00',
        cnh: '12345678901',
        categoriaCNH: 'D',
        validadeCNH: new Date('2025-12-31'),
        telefone: '(11) 91234-5678',
        email: 'carlos@frete.com',
        observacoes: 'Motorista experiente.'
      },
      {
        id: 2,
        nome: 'Ana Souza',
        cpf: '987.654.321-00',
        cnh: '98765432100',
        categoriaCNH: 'C',
        validadeCNH: new Date('2026-05-20'),
        telefone: '(21) 99876-5432',
        email: 'ana@transportes.com',
        observacoes: ''
      }
    ];
    this.collectionSize = this.motoristas.length;
    this.refreshMotoristas();
  }

  refreshMotoristas(): void {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedMotoristas = this.motoristas.slice(start, end);
  }

  novoModelo(): any {
    return {
      id: null,
      nome: '',
      cpf: '',
      cnh: '',
      categoriaCNH: '',
      validadeCNH: '',
      telefone: '',
      email: '',
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

  salvarMotorista(form: NgForm) {
    if (!form.valid) return;

    const novoMotorista = {
      ...this.modelo,
      id: this.motoristas.length > 0 ? Math.max(...this.motoristas.map(m => m.id)) + 1 : 1
    };

    this.motoristas.unshift(novoMotorista);
    this.collectionSize = this.motoristas.length;
    this.page = 1;
    this.refreshMotoristas();
    this.cancelar();

    Swal.fire({
      icon: 'success',
      title: 'Motorista cadastrado!',
      showConfirmButton: false,
      timer: 1500
    });
  }

  abrirModalDetalhes(motorista: any): void {
    this.motoristaSelecionado = motorista;
    this.modalService.open(this.modalDetalhes, { size: 'lg', centered: true });
  }

  editarMotorista(motorista: any): void {
    this.modelo = { ...motorista };
    this.exibirFormulario = true;
  }

  excluirMotorista(id: number): void {
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
        this.motoristas = this.motoristas.filter(m => m.id !== id);
        this.refreshMotoristas();
        Swal.fire({
          icon: 'success',
          title: 'Excluído!',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  constructor(public modalService: NgbModal) {}
}
