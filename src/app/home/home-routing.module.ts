import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VHomeComponent } from './v-home/v-home.component';
import { HomeComponent } from './home/home.component';
import { ViewVideoComponent } from './view-video/view-video.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component : VHomeComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'vd', component: ViewVideoComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
