import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  /* Telas de Exibicao e Upload de Documentos para a central */
  { path: 'documents', loadChildren: './pages/documents/list-documents/list-documents.module#ListDocumentsPageModule' },
  {
    path: 'upload-documents',
    loadChildren: './pages/documents/upload-documents/upload-documents.module#UploadDocumentsPageModule',
  },

  /* Telas dos Relatorios/Informes*/
  { path: 'reports', loadChildren: './pages/reports/reports/reports.module#ReportsPageModule' },
  { path: 'list-reports', loadChildren: './pages/reports/list-reports/list-reports.module#ListReportsPageModule' },

  /* Telas das mensagens */
  { path: 'messages', loadChildren: './pages/messages/messages/messages.module#MessagesPageModule' },
  {
    path: 'view-message/:messageID',
    loadChildren: './pages/messages/view-message/view-message.module#ViewMessagePageModule',
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'nfe', loadChildren: './pages/documents/nfe/nfe.module#NfePageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
