import { MessageComponent } from './../message/message.component';
import { Conge } from './../../shared/security/models/conge';
import { Subscription } from 'rxjs';
import { CongesService } from './../../shared/services/conges/conges-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent implements OnInit, OnDestroy {
  private httpFindlistConges$: Subscription;
  private listConges$: Subscription;

  protected listConges: Array<Conge> = [];
  constructor(
    private congesService: CongesService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listConges$ = this.congesService.ArraylistConges.subscribe(state => {
      this.listConges = state;
    });

    this.findConges();
  }

  ngOnDestroy(): void {
    if (this.listConges$) {
      this.listConges$.unsubscribe();
    }
    if (this.httpFindlistConges$) {
      this.httpFindlistConges$.unsubscribe();
    }
  }

  findConges() {
    this.httpFindlistConges$ = this.congesService
      .findCongesCollaborater()
      .subscribe(
        listConges => {
          this.listConges = listConges;
        },
        error => {
          this.congesService.clearListConges();
          const modalRef = this.modalService.open(MessageComponent, {
            size: 'sm'
          });
          modalRef.componentInstance.message = error.message;
        }
      );
  }
}
