import { Request, Response, NextFunction } from 'express';
import Contact from '../models/contact';

class ContactsController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await Contact.create(req.body);
      res.status(201).json(contact);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
      }
      res.json(contact);
    } catch (err) {
      next(err);
    }
  }

  async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}

export default new ContactsController();
