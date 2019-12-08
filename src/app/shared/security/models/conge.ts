export class Conge {
  id: number;
  cause: number;
  private _dateDebut: any;
  dateDemande: string;
  dateFin: string;
  nombreJour: number;

  get dateDebut(): any {
    console.log(`Hello, my name is ${this._dateDebut}!`);
    if (this._dateDebut && typeof this._dateDebut.format === 'function') {
      return this._dateDebut.format();
    }
    return this._dateDebut;
  }
  set dateDebut(value: any) {
    console.log(`Hello, my name is ${this._dateDebut}!`);
    if (this._dateDebut && typeof this._dateDebut.format === 'function') {
      this._dateDebut.format();
    }
  }

}
