import { Account } from './account';

export class Notification {
    id:number;
    visto:boolean;
    tipo: String;
    contenido: String;
    account: Account;
}
