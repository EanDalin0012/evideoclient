import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { VLayoutComponent } from './v-layout/v-layout/v-layout.component';
import { Error404Component } from './errorpages/error404/error404.component';
import { Error500Component } from './errorpages/error500/error500.component';

const routes: Routes = [
  // {
  //   path: '', component: BlankLayoutComponent,
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  //     }
  //   ]
  // },
  {
    path: '', component: VLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '', component: VLayoutComponent,
    children: [
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
      }
    ]
  },
  { path: 'error500', component: Error500Component },
  { path: '**', component: Error404Component },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
