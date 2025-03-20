import { Router } from 'express';
import AuthController from '../../middlewares/controller/authController';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
/*router.get('/verificar-sesion', AuthController.verificarSesion);
router.get('/obtener-usuario', AuthController.obtenerUsuario);
router.post('/cerrar-sesion', AuthController.cerrarSesion);*/

export default router;
