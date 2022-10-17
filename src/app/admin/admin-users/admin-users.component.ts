import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: IUser[] = [];

  display: boolean = false;

  displayEdit: boolean = false;

  roles: { name: string, code: string }[];

  selectedRole: string = 'Customer';

  editUser: IUser = {displayName: "", email: "", uid: ""}

  constructor(private userService: UserService,
              public authService: AuthService) {
    this.roles = [
      {name: 'Admin', code: 'AD'},
      {name: 'Customer', code: 'CM'}
    ];
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {this.users = users; console.log(this.users);});

  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user);
  }

  openAddDialog() {
    this.display = true;
  }

  onUpdateRole(role: {name: string, code: string}) {
    this.userService.updateUserRole(this.editUser, role.name);
    console.log(role.name);
  }

  displayEditDialog(user: IUser) {
    this.displayEdit = true;
    this.editUser = user;
    console.log(this.editUser);
  }
}
