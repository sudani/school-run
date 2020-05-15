export interface IDriver {
  id: string;
  name: string;
  addres1: string;
  addres2: string;
  city: string;
  postCode: string;
  telphone: string;
}

export interface IDriverFormValues extends Partial<IDriver> {
  telphone?: string;
}

export class DriverFormValues implements IDriverFormValues {
  id?: string = undefined;
  name: string = "";
  addres1: string = "";
  addres2: string = "";
  city: string = "";
  postCode: string = "";
  telphone?: string = undefined;

  constructor(init?: IDriverFormValues) {
    // if (init && init.telphone) {
    //   init.telphone = init.telphone;
    // }
    Object.assign(this, init);
  }
}
