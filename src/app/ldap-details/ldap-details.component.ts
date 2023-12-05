import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {UserLdap} from "../models/user-ldap";
import {UsersService} from "../service/users.service";
import {FormBuilder} from "@angular/forms";

export abstract class LdapDetailsComponent implements OnInit{
  user: UserLdap | undefined;
  processLoadRunning: boolean = false;
  processValidateRunning: boolean = false;
  passwordPlaceHolder: string;
  userForm = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: [''],
    }),
    mail: {value: '', disabled: true},
  });

  constructor(public addForm: boolean, private usersService: UsersService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
  }

  protected onInit(): void {

  }

  ngOnInit(): void {
    this.getUser();
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']).then((e) => {
      if(!e) {
        console.error('Navigation has failed !');
      }
    })
  }

  onSubmitForm(): void {
    this.validateForm();
  }
  updateLogin(): void {
    const control = this.userForm.get('login');
    if(control === null) {
      console.error("L'objet 'login' du formulaire n'existe pas");
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }
  updateMail(): void {
    const control = this.userForm.get('mail');
    if(control === null) {
      console.error("L'objet 'mail' du formulaire n'existe pas");
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }
  isFormValid(): boolean {
    return this.userForm.valid && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void

  private formGetValue(name: string): any {
    const control = this.userForm.get(name);
    if(control === null) {
      console.error("L'objet '" + name +"' du formulaire n'existe pas");
      return "";
    }
    return control.value;
  }

  private formSetValue(name: string, value: string | number): void {
    const control = this.userForm.get(name);
    if(control === null) {
      console.error("L'objet '" + name +"' du formulaire n'existe pas");
      return;
    }
    control.setValue(value);
  }

  protected copyUserToFormControl(): void {
    if (this.user === undefined) {
      return;
    }

    this.formSetValue('login', this.user.login);
    this.formSetValue('nom', this.user.nom);
    this.formSetValue('prenom', this.user.prenom);
    this.formSetValue('mail', this.user.mail);
    /*
    this.formSetValue('employeNumero', this.user.employeNumero);
    this.formSetValue('employeNiveau', this.user.employeNiveau);
    this.formSetValue('dateEmbauche', this.user.dateEmbauche);
    this.formSetValue('publisherId', this.user.publisherId);
    this.formSetValue('active', this.user.active);
    */
  }

  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('nom') + ' ' + this.formGetValue('prenom'),
      mail: this.formGetValue('mail'),
      // Les valeurs suivantes devraient être reprise du formualre
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role:'ROLE_USER',

    }
  }
}