export class BillTaxTypes {
  genericKey : string;
  id : string;
  description : string;
  glCode : string;
  complexGenericKey : string;
  created : string | null;
  creator : string;
  changed : string | null;
  changer : string;
  lifeCycleState : string | null;

  constructor() {
    this.genericKey = '';
    this.id = '';
    this.description = '';
    this.glCode = '';
    this.complexGenericKey = '';
    this.created = null;
    this.creator = '';
    this.changed = null;
    this.changer = '';
    this.lifeCycleState = null;
  }
}
