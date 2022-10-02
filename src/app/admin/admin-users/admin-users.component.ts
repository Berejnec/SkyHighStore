import {Component, OnInit} from '@angular/core';
import {IUser} from "../../interfaces/user.interface";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: IUser[] = [];

  display: boolean = false;

  constructor(private userService: UserService,
              public authService: AuthService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  deleteUser(user: IUser) {
    this.userService.deleteUser(user);
  }

  addUser(user: IUser) {
    this.userService.addUser(user);
  }

  openAddDialog() {
    this.display = true;
  }

}
