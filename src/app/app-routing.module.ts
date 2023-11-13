import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {PagNotFoundComponent} from "./pag-not-found/pag-not-found.component";

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: '**', component: PagNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
