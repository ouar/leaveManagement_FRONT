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
  httpDeletConges$: Subscription;
  httpUpdateConges$: Subscription;
  httpAddConges$: Subscription;
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
        this.addRowData(result.data);
      } else if (result.event === 'Modifier') {
        this.updateRowData(result.data);
      } else if (result.event === 'Supprimer') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(conge: Conge) {
    this.httpAddConges$ = this.congesService
      .addCongeCollaborater(conge)
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
  updateRowData(conge: Conge) {
    console.log(conge.dateDebut);
    this.httpUpdateConges$ = this.congesService
      .updateCongeCollaborater(conge)
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
  deleteRowData(conge: Conge) {
    this.httpDeletConges$ = this.congesService
      .deleteCongeCollaborater(conge.id)
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
