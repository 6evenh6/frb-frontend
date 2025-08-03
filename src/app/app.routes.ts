// src/app/app.routes.ts

import { Routes } from '@angular/router';

// Importe seu componente de Layout
import { LayoutComponent } from './core/layout/layout';

// Importe os componentes das suas páginas
import { ReceitasComponent } from './pages/receitas/receitas';
import { Despesas } from './pages/despesas/despesas';
import { Motoristas } from './pages/motoristas/motoristas';
import { CaminhoesComponent } from './pages/caminhoes/caminhoes';
import { Pessoas } from './pages/pessoas/pessoas';
import { Usuarios } from './pages/usuarios/usuarios';
import { ViagensComponent } from './pages/viagens/viagens';

export const routes: Routes = [
  {
    path: '', // Esta é a rota base que carregará o LayoutComponent
    component: LayoutComponent, // O LayoutComponent será renderizado aqui
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Rota principal
      { path: 'home', loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'receitas', component: ReceitasComponent },
      { path: 'despesas', component: Despesas },
      { path: 'motoristas', component: Motoristas },
      { path: 'caminhoes', component: CaminhoesComponent },
      { path: 'pessoas', component: Pessoas },
      { path: 'usuarios', component: Usuarios },
      { path: 'viagens', component: ViagensComponent }
    ]
  },
  // Se você tiver rotas que NÃO devem usar o layout (ex: uma tela de Login separada),
  // elas viriam AQUI, fora do objeto de rota do LayoutComponent.
  // Exemplo: { path: 'login', component: LoginComponent },

  // Rota curinga para qualquer caminho não encontrado, redireciona para a rota base do layout
  { path: '**', redirectTo: '' }
];