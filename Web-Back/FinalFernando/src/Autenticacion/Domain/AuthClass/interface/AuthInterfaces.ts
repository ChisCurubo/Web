// IAuthResponse Interface
export interface IAuthResponse {
  token: string;
  usuario: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      rolId: number;
      rolNombre: string;
  };
  mensaje: string; 
}


// ILoginCredentials Interface
export interface ILoginCredentials {
  email: string;
  password: string;
}

// IRegisterData Interface
export interface IRegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rolId?: number; 
}

// IRecoverPasswordData Interface
export interface IRecoverPasswordData {
  email: string;
}

// TokenPayload Interface
export interface TokenPayload {
  id: number;
  rolId: number;
}


// AuthResponseInterfaces.ts

export interface IVerificarSesionActivaResponse {
  active: boolean; // Agregar esta línea
  token: string;
  usuario: {
      id: number;
      nombre: string;
      apellido: string;
      email: string; // Asegúrate de que sea 'email'
      rolId: number;
      rolNombre: string;
  };
  mensaje: string;
}


// IAuthResponse Interface
export interface IAuthResponse {

  active: boolean; 
  token: string;
  usuario: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
      rolId: number;
      rolNombre: string;
  };
  mensaje: string; 
  // Agregar esta línea si es necesario
}

export interface IObtenerUsuarioPorTokenResponse {
  id: number;
  correo: string;
  rol: string;
  error?: string;
}

export interface ICerrarSesionResponse {
  mensaje: string;
  error?: string;
}


// AuthResponseInterfaces.ts
export interface IRegisterResponse {
  mensaje: string;
  error?: string;
  success?: boolean; // Nueva propiedad
}


export interface IObtenerUsuarioPorTokenResponse {
  id: number;
  correo: string;
  rolId?: number; // Asegúrate de que el tipo sea correcto
  error?: string; // Si es necesario
}

export interface IRequestPasswordResetResponse {
  sucess:boolean
  mensaje: string;
}

export interface IResetPasswordResponse {
  sucess:boolean
  mensaje: string;
}
