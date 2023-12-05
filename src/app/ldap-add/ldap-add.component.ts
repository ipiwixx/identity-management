import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {UsersService} from "../service/users.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-add',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapAddComponent extends LdapDetailsComponent implements OnInit{
  constructor(private usersService: UsersService, fb: FormBuilder, router: Router) {
    super(true, fb, router);
  }

  ngOnInit() : void {
    super.onInit();
  }

  validateForm(): void {
    console.log('LdapAddComponent - validateForm')
  }
}
