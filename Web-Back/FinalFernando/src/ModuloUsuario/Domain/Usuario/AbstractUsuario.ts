import { IRespuestaUsuario, IUsuarioInfo, UsuarioInterface } from "./interfaces/UsuarioInterfaces";


export default abstract class AbstractUsuario {
  protected idUsuario: number;
  protected nombreUsuario: string;
  protected apellidoUsuario: string;
  protected correoUsuario: string;
  protected contrasenaUsuario: string;
  protected estadoUsuario: number;
  protected rolId: number;
  protected cedula: string; // Agregado el campo de cédula

  constructor(usuarioInterface: UsuarioInterface) {
    this.idUsuario = usuarioInterface.idUsuario;
    this.nombreUsuario = usuarioInterface.nombreUsuario;
    this.apellidoUsuario = usuarioInterface.apellidoUsuario;
    this.correoUsuario = usuarioInterface.correoUsuario;
    this.contrasenaUsuario = usuarioInterface.contrasenaUsuario;
    this.estadoUsuario = usuarioInterface.estadoUsuario;
    this.rolId = usuarioInterface.rolId;
    this.cedula = usuarioInterface.cedula; // Inicialización de cédula
  }

  // Métodos abstractos
  public abstract toString(): string;
  public abstract isNull(): boolean;

  // Validaciones
  protected validateId(id: number): boolean {
    return typeof id === "number" && id > 0;
  }

  protected validateNombre(nombre: string): boolean {
    return typeof nombre === "string" && nombre.trim().length > 0;
  }

  protected validateCorreo(correo: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof correo === "string" && emailRegex.test(correo);
  }

  protected validateContrasena(contrasena: string): boolean {
    return typeof contrasena === "string" && contrasena.length >= 6;
  }

  protected validateEstado(estado: number): boolean {
    return typeof estado === "number" && (estado === 0 || estado === 1);
  }

  protected validateRolId(rolId: number): boolean {
    return typeof rolId === "number" && rolId > 0;
  }

  protected validateCedula(cedula: string): boolean {
    return typeof cedula === "string" && cedula.trim().length > 0; // Validación simple para cédula
  }

  // Getters
  public getId(): number {
    return this.idUsuario;
  }

  public getNombre(): string {
    return this.nombreUsuario;
  }

  public getApellido(): string {
    return this.apellidoUsuario;
  }

  public getCorreo(): string {
    return this.correoUsuario;
  }

  public getContrasena(): string {
    return this.contrasenaUsuario;
  }

  public getEstado(): number {
    return this.estadoUsuario;
  }

  public getRolId(): number {
    return this.rolId;
  }

  public getCedula(): string {
    return this.cedula; // Getter para cédula
  }

  // Setters con validación
  public setId(id: number): void {
    if (this.validateId(id)) this.idUsuario = id;
  }

  public setNombre(nombre: string): void {
    if (this.validateNombre(nombre)) this.nombreUsuario = nombre.trim();
  }

  public setApellido(apellido: string): void {
    if (this.validateNombre(apellido)) this.apellidoUsuario = apellido.trim();
  }

  public setCorreo(correo: string): void {
    if (this.validateCorreo(correo)) this.correoUsuario = correo;
  }

  public setContrasena(contrasena: string): void {
    if (this.validateContrasena(contrasena)) this.contrasenaUsuario = contrasena;
  }

  public setEstado(estado: number): void {
    if (this.validateEstado(estado)) this.estadoUsuario = estado;
  }

  public setRolId(rolId: number): void {
    if (this.validateRolId(rolId)) this.rolId = rolId;
  }

  public setCedula(cedula: string): void {
    if (this.validateCedula(cedula)) this.cedula = cedula; // Setter para cédula
  }

  // Métodos de negocio
  public esAdmin(): boolean {
    return this.rolId === 1;
  }

  public esUsuario(): boolean {
    return this.rolId === 2;
  }

  // Método para transformar a información de usuario
  public toInfo(): IUsuarioInfo {
    return {
      idUsuario: this.idUsuario,
      nombreUsuario: this.nombreUsuario,
      apellidoUsuario: this.apellidoUsuario,
      correoUsuario: this.correoUsuario,
      estadoUsuario: this.estadoUsuario,
      rolUsuario: this.rolId === 1 ? 'Administrador' : 'Usuario',
      cedula: this.cedula 
    };

  }

  public abstract toInfomessege(): IRespuestaUsuario 


}
  
