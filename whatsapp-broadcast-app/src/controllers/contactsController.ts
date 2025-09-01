import { Request, Response } from 'express';
import { Contact } from '../models/contact';

export class ContactsController {
    private contacts: Contact[] = [];

    public addContact(req: Request, res: Response): void {
        const { name, phone } = req.body;
        const newContact: Contact = { id: this.contacts.length + 1, name, phone };
        this.contacts.push(newContact);
        res.status(201).json(newContact);
    }

    public removeContact(req: Request, res: Response): void {
        const { id } = req.params;
        this.contacts = this.contacts.filter(contact => contact.id !== parseInt(id));
        res.status(204).send();
    }

    public listContacts(req: Request, res: Response): void {
        res.status(200).json(this.contacts);
    }
}