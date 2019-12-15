import { MessageComponent } from './../../message/message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Collaboraterervice } from './../../../shared/services/collaborateur/collaborateur-service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Collaborateur } from '../../../shared/security/models/collaborateur';

@Component({
  selector: 'app-liste-collaborateur',
  templateUrl: './liste-collaborateur.component.html',
  styleUrls: ['./liste-collaborateur.component.css']
})
export class ListeCollaborateurComponent implements OnInit, OnDestroy {
  private httpFindlistCollaboraters$: Subscription;
  private listCollaboraters$: Subscription;
  showMenu: string;

  protected listCollaboraters: Array<Collaborateur> = [];
  constructor(
    private collaboratersService: Collaboraterervice,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.listCollaboraters$ = this.collaboratersService.ArraylistCollaborater.subscribe(
      state => {
        this.listCollaboraters = state;
      }
    );

    this.findCollaboraters();
  }

  ngOnDestroy(): void {
    if (this.listCollaboraters$) {
      this.listCollaboraters$.unsubscribe();
    }
    if (this.httpFindlistCollaboraters$) {
      this.httpFindlistCollaboraters$.unsubscribe();
    }
  }

  findCollaboraters() {
    this.httpFindlistCollaboraters$ = this.collaboratersService.findCollaborater().subscribe(
      listCollaboraters => {
        this.listCollaboraters = listCollaboraters;
      },
      error => {
        this.collaboratersService.clearListCollaboraters();
        const modalRef = this.modalService.open(MessageComponent, {
          size: 'sm'
        });
        modalRef.componentInstance.message = error.message;
      }
    );
  }

}
