import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ClientsPageComponent } from './pages/clients-page/clients-page.component';
import { ClientDetailsPageComponent } from './pages/client-details-page/client-details-page.component';
import { ClientFormPageComponent } from './pages/client-form-page/client-form-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'clients', component: ClientsPageComponent },
  { path: 'clients/new', component: ClientFormPageComponent },
  { path: 'clients/:id/edit', component: ClientFormPageComponent },
  { path: 'clients/:id', component: ClientDetailsPageComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
