import AbstractCarrito from "../../../carrito/types/AbstractTypes/AbstractCarrito";
import AbstractFavoritos from "../../../favorito/types/AbstractTypes/AbstractFavoritos";
import AbstractRol from "../../../roles/types/AbstractTypes/AbstractRol";
import { Usuario } from "../interface/UsuarioInterface";

export default abstract class AbstractUsuario {
  protected ci: string;
  protected nombreUsuario: string;
  protected apellidoUsuario: string;
  protected correoUsuario: string;
  protected contrasenaUsuario: string;
  protected estadoUsuario: boolean;
  protected rolUsuario: AbstractRol;
  protected carrito: AbstractCarrito[];
  protected favoritos: AbstractFavoritos[];

  constructor(usuarioAttributes: Usuario) {
    this.ci = this.validateCi(usuarioAttributes.ci);
    this.nombreUsuario = this.validateNombre(usuarioAttributes.nombreUsuario);
    this.apellidoUsuario = this.validateNombre(usuarioAttributes.apellidoUsuario);
    this.correoUsuario = this.validateCorreo(usuarioAttributes.correoUsuario);
    this.contrasenaUsuario = usuarioAttributes.contrasenaUsuario; 
    this.estadoUsuario = usuarioAttributes.estadoUsuario;
    this.rolUsuario = usuarioAttributes.rolUsuario;
    this.carrito = this.validateCarrito(usuarioAttributes.carrito);
    this.favoritos = this.validateFavoritos(usuarioAttributes.favoritos);
  }

  public abstract isNull(): boolean;

  //Getters -----------------------------------
  public getCi(): string {
    return this.ci;
  }

  public getNombreUsuario(): string {
    return this.nombreUsuario;
  }

  public getApellidoUsuario(): string {
    return this.apellidoUsuario;
  }

  public getCorreoUsuario(): string {
    return this.correoUsuario;
  }

  public getContrasenaUsuario(): string {
    return this.contrasenaUsuario;
  }

  public getEstadoUsuario(): boolean {
    return this.estadoUsuario;
  }

  public getRolUsuario(): AbstractRol {
    return this.rolUsuario;
  }

  public getCarrito(): AbstractCarrito[] {
    return this.carrito;
  }

  public getFavoritos(): AbstractFavoritos[] {
    return this.favoritos;
  }

  //Setters con validaciones -------------------
  public setCi(ci: string): void {
    this.ci = this.validateCi(ci);
  }

  public setNombreUsuario(nombre: string): void {
    this.nombreUsuario = this.validateNombre(nombre);
  }

  public setApellidoUsuario(apellido: string): void {
    this.apellidoUsuario = this.validateNombre(apellido);
  }

  public setCorreoUsuario(correo: string): void {
    this.correoUsuario = this.validateCorreo(correo);
  }

  // TODO: Verificar contraseñas encriptadas
  public setContrasenaUsuario(contrasena: string): void {
    this.contrasenaUsuario = contrasena; 
  }

  public setEstadoUsuario(estado: boolean): void {
    this.estadoUsuario = estado;
  }

  public setRolUsuario(rol: AbstractRol): void {
    this.rolUsuario = rol;
  }

  public setCarrito(carrito: AbstractCarrito[]): void {
    this.carrito = this.validateCarrito(carrito);
  }

  public setFavoritos(favoritos: AbstractFavoritos[]): void {
    this.favoritos = this.validateFavoritos(favoritos);
  }

  //Validación ---------------------
  private validateCi(ci: string): string {
    if (!/^\d+$/.test(ci)) {
      throw new Error("El CI debe contener solo números.");
    }
    return ci;
  }

  private validateNombre(valor: string): string {
    if (valor.trim().length === 0) {
      throw new Error(`El nombre o apellido no puede estar vacío.`);
    }
    return valor.trim();
  }

  private validateCorreo(correo: string): string {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(correo)) {
      throw new Error("El correo no es válido.");
    }
    return correo;
  }

  private validateCarrito(carrito: AbstractCarrito[]): AbstractCarrito[] {
    if (!Array.isArray(carrito) || carrito.length <= 0) {
      throw new Error("El carrito debe ser un array almenos 0.");
    }
    return carrito;
  }

  private validateFavoritos(favoritos: AbstractFavoritos[]): AbstractFavoritos[] {
    if (!Array.isArray(favoritos) || favoritos.length <= 0) {
      throw new Error("Los favoritos deben ser un array almenos 0.");
    }
    return favoritos;
  }
}
