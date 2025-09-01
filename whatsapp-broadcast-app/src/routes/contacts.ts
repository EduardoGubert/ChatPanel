import { Router } from 'express';
import ContactsController from '../controllers/contactsController';

const router = Router();
const contactsController = new ContactsController();

router.post('/contacts', contactsController.addContact);
router.delete('/contacts/:id', contactsController.removeContact);
router.get('/contacts', contactsController.listContacts);

export default router;