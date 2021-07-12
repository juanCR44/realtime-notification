import { Notification } from './notification';

export class Account {
    id: number;
    nombre: string;
    habilitado :boolean;
    notification: Notification[] = [];
}
