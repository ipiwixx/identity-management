import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LdapListComponent} from "./ldap-list/ldap-list.component";
import {PagNotFoundComponent} from "./pag-not-found/pag-not-found.component";
import {LdapDetailsComponent} from "./ldap-details/ldap-details.component";
import {LdapEditComponent} from "./ldap-edit/ldap-edit.component";
import {LdapAddComponent} from "./ldap-add/ldap-add.component";

const routes: Routes = [
  { path: 'users/list', component: LdapListComponent },
  { path: 'user/add', component: LdapAddComponent },
  { path: 'user/:id', component: LdapEditComponent },
  { path: '**', component: PagNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
