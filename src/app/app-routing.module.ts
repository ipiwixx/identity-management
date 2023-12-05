import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {PagNotFoundComponent} from "./pag-not-found/pag-not-found.component";
import {LdapDetailsComponent} from "./ldap-details/ldap-details.component";

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'user/:id', component: LdapDetailsComponent },
  { path: '**', component: PagNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
