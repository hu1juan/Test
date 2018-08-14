import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnlinetestComponent } from './onlinetest/onlinetest.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: 'frontend', component: OnlinetestComponent },
  { path: 'backend', component: OnlinetestComponent },
  { path: 'backend/php', component: OnlinetestComponent },
  { path: 'database', component: OnlinetestComponent },
  { path: 'corevalues', component: OnlinetestComponent },
  { path: 'english', component: OnlinetestComponent },
  { path: '404', component: RedirectComponent },
  {
    path: '',
    redirectTo: '404',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  entryComponents: [OnlinetestComponent, RedirectComponent]
})
export class AppRoutingModule {}
