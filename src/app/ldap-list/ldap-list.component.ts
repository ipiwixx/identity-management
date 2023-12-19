import {Component,AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../models/user-ldap";
import {MatPaginator} from "@angular/material/paginator";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {UsersService} from "../service/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource : MatTableDataSource<UserLdap> = new MatTableDataSource<UserLdap>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;
  unactiveSelected: any;

  constructor(private usersService: UsersService, private router: Router) {
    this.paginator = null;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
    /*console.log('Value on ngOnInit():');
    this.dataSource.paginator = this.paginator;
    console.log("Mat Paginator:", this.paginator);*/
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter)
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    /*console.log('Value on ngAfterViewInit():');
    console.log("Mat Paginator:", this.paginator);*/
  }

  private getUsers() : void {
    this.usersService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter( user => {
            return !user.active
          })
        } else {
          this.dataSource.data = users;
        }
      }
    )

  }

  unactiveChanged($event: MatSlideToggleChange) : void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string) : void {
    this.router.navigate(['user/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    });
  }

  addUser() {
    this.router.navigate(['/user/add']).then((e) => {
      if (!e) {
        console.log('Navigation has failed!');
      }
    })
  }
}
