import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { CongesService } from 'src/app/shared/services/conges/conges-service';
import { Subscription } from 'rxjs';
import { Conge } from 'src/app/shared/security/models/conge';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-crud-conge',
  templateUrl: './crud-conge.component.html',
  styleUrls: ['./crud-conge.component.css']
})
export class CrudCongeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'cause',
    'dateDebut',
    'dateDemande',
    'dateFin',
    'nombreJour',
    'action'
  ];
  private httpFindlistConges$: Subscription;
  private listConges$: Subscription;
  private httpDeletConges$: Subscription;
  private httpUpdateConges$: Subscription;
  private httpAddConges$: Subscription;
  protected dataSource: Array<Conge> = [];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private congesService: CongesService) {}

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '550px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Ajouter') {
        this.addCongeCollaborateur(result.data);
      } else if (result.event === 'Modifier') {
        this.updateCongeCollaborateur(result.data);
      } else if (result.event === 'Supprimer') {
        this.deleteCongeCollaborateur(result.data);
      }
    });
  }

  addCongeCollaborateur(conge: Conge) {
    this.httpAddConges$ = this.congesService
      .addCongeCollaborateur(conge)
      .subscribe(
        listConges => {
          this.dataSource = listConges;
        },
        error => {
          // this.congesService.clearListConges();
        }
      );
    this.table.renderRows();
  }
  updateCongeCollaborateur(conge: Conge) {
    console.log(conge.dateDebut);
    this.httpUpdateConges$ = this.congesService
      .updateCongeCollaborateur(conge)
      .subscribe(
        listConges => {
          this.dataSource = listConges;
        },
        error => {
          //this.congesService.clearListConges();
        }
      );
    this.table.renderRows();
  }
  deleteCongeCollaborateur(conge: Conge) {
    this.httpDeletConges$ = this.congesService
      .deleteCongeCollaborateur(conge.id)
      .subscribe(
        listConges => {
          this.dataSource = listConges;
        },
        error => {
          // this.congesService.clearListConges();
        }
      );
    this.table.renderRows();
  }

  ngOnInit() {
    this.listConges$ = this.congesService.ArraylistConges.subscribe(state => {
      this.dataSource = state;
    });

    this.findConges();
  }

  findConges() {
    this.httpFindlistConges$ = this.congesService
      .findCongesCollaborater()
      .subscribe(
        listConges => {
          this.dataSource = listConges;
        },
        error => {
          // this.congesService.clearListConges();
        }
      );
  }

  ngOnDestroy(): void {
    if (this.listConges$) {
      this.listConges$.unsubscribe();
    }
    if (this.httpFindlistConges$) {
      this.httpFindlistConges$.unsubscribe();
    }
    if (this.httpAddConges$) {
      this.httpAddConges$.unsubscribe();
    }
    if (this.httpUpdateConges$) {
      this.httpUpdateConges$.unsubscribe();
    }
    if (this.httpDeletConges$) {
      this.httpDeletConges$.unsubscribe();
    }
  }
}
