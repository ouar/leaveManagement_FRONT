// tslint:disable-next-line:quotemark
import { Role } from "./role";
export class User {
  id: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  roles: Role[];
  authdata?: string;
}
