import { Request, Response } from "express";

import AuthUseCasePort from "../../Domain/Port/Driver/AuthServicePort";
import AuthControllerExpressInterface from "../../Domain/Interfaces/AuthControllerExpressInterface";

export default class AuthControllerExpress implements AuthControllerExpressInterface {
  constructor(private readonly authUseCase: AuthUseCasePort) {}

  // Registrar usuario
  async registrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, apellido, correo, contrasena, rol } = req.body;

      if (!nombre || !apellido || !correo || !contrasena) {
        res.status(400).json({ error: "Faltan datos: nombre, apellido, correo y contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.register(nombre, apellido, correo, contrasena, rol);
      res.status(201).json(response);
    } catch (error: unknown) {
      console.error("Error en registrarUsuario:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Iniciar sesión
  async iniciarSesion(req: Request, res: Response): Promise<void> {
    try {
      const { correoUsuario, contrasenaUsuario } = req.body;

      if (!correoUsuario || !contrasenaUsuario) {
        res.status(400).json({ error: "Faltan datos: correo y contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.login(correoUsuario, contrasenaUsuario);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en iniciarSesion:", error);
      if (error instanceof Error) {
        res.status(401).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Verificar sesión activa
  async verificarSesionActiva(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Falta el token." });
        return;
      }

      const payload = await this.authUseCase.verificarSesionActiva(token);

      if (!payload) {
        res.status(401).json({ error: "Token inválido o expirado." });
        return;
      }

      res.status(200).json(payload);
    } catch (error: unknown) {
      console.error("Error en verificarSesionActiva:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Obtener usuario por token
  async obtenerUsuarioPorToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Falta el token." });
        return;
      }

      const usuario = await this.authUseCase.obtenerUsuarioPorToken(token);
      res.status(200).json(usuario);
    } catch (error: unknown) {
      console.error("Error en obtenerUsuarioPorToken:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }


  // Cerrar sesión
  async logout(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ error: "Falta el token." });
        return;
      }

      const response = await this.authUseCase.cerrarSesion(token);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en logout:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Restablecer contraseña
  async restablecerContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { correoUsuario, codigo, nuevaContrasena } = req.body;

      if (!correoUsuario || !codigo || !nuevaContrasena) {
        res.status(400).json({ error: "Faltan datos: correo, código y nueva contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.OlvideContarseña(correoUsuario, codigo, nuevaContrasena);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en restablecerContrasena:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }

  // Cambiar nueva contraseña
  async cambiarNuevaContrasena(req: Request, res: Response): Promise<void> {
    try {
      const { correoUsuario, nuevaContrasena } = req.body;

      if (!correoUsuario || !nuevaContrasena) {
        res.status(400).json({ error: "Faltan datos: correo y nueva contraseña son obligatorios." });
        return;
      }

      const response = await this.authUseCase.CambiarContraseña(correoUsuario, nuevaContrasena);
      res.status(200).json(response);
    } catch (error: unknown) {
      console.error("Error en cambiarNuevaContrasena:", error);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido" });
      }
    }
  }



}