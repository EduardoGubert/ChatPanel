import { Router } from 'express';
import contactsController from '../controllers/contactsController';

const router = Router();

router.get('/', contactsController.list);
router.post('/', contactsController.create);
router.put('/:id', contactsController.update);
router.delete('/:id', contactsController.remove);

export default router;
