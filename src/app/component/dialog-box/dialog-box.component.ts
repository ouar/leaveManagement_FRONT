import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Conge } from 'src/app/shared/security/models/conge';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  action: string;
  localData: any;
  congeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Conge,
    private formBuilder: FormBuilder
  ) {
    this.localData = { ...data };
    this.action = this.localData.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog() {
    this.action = null;
    this.dialogRef.close({ event: 'Cancel' });
  }

  ngOnInit() {
    this.congeForm = this.formBuilder.group({
      cause: [this.localData.cause, Validators.required],
      dateDebut: [this.localData.dateDebut, Validators.required],
      dateFin: [this.localData.dateFin, Validators.required]
    });

    this.onChanges();
  }

  onChanges(): void {
    this.congeForm.controls.dateDebut.valueChanges.subscribe(newDateDebut => {
      if (typeof newDateDebut !== 'string') {
        this.localData.dateDebut = newDateDebut.format('YYYY-MM-DD');
      }
    });

    this.congeForm.controls.dateFin.valueChanges.subscribe(newDateFin => {
      if (typeof newDateFin !== 'string') {
        this.localData.dateFin = newDateFin.format('YYYY-MM-DD');
      }
    });

    this.congeForm.controls.cause.valueChanges.subscribe(newCause => {
      this.localData.cause = newCause;
    });
  }
}
