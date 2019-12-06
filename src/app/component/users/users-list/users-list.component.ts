import { User } from './../../../shared/security/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './../../../shared/services/user/user-service';
import { Subscription } from 'rxjs';
import { MessageComponent } from './../../message/message.component';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  private httpFindlistUsers$: Subscription;
  private listUsers$: Subscription;

  protected listUsers: Array<User> = [];
  constructor(
    private UsersService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listUsers$ = this.UsersService.ArraylistUser.subscribe(state => {
      this.listUsers = state;
    });

    this.findUsers();
  }

  ngOnDestroy(): void {
    if (this.listUsers$) {
      this.listUsers$.unsubscribe();
    }
    if (this.httpFindlistUsers$) {
      this.httpFindlistUsers$.unsubscribe();
    }
  }

  findUsers() {
    this.httpFindlistUsers$ = this.UsersService.findUser().subscribe(
      listUsers => {
        this.listUsers = listUsers;
      },
      error => {
        this.UsersService.clearListUsers();
        const modalRef = this.modalService.open(MessageComponent, {
          size: 'sm'
        });
        modalRef.componentInstance.message = error.message;
      }
    );
  }
}
