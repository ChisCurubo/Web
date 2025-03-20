import { Rol } from "../interface/RolInterface";
import AbstractPermiso from "./AbstractPermiso";

export default abstract class AbstractRol {
  protected idRol: number;
  protected nombreRol: string;
  protected descripcionRol: string;
  protected estadoRol: boolean;
  protected permisos: AbstractPermiso[];

  constructor(rolAttributes: Rol) {
    this.idRol = this.validateIdRol(rolAttributes.idRol);
    this.nombreRol = this.validateNombreRol(rolAttributes.nombreRol);
    this.descripcionRol = rolAttributes.descripcionRol;
    this.estadoRol = rolAttributes.estadoRol;
    this.permisos = this.validatePermisos(rolAttributes.permisos);
  }

  public abstract isNull(): boolean;

  //Getters -----------------------------------
  public getIdRol(): number {
    return this.idRol;
  }

  public getNombreRol(): string {
    return this.nombreRol;
  }

  public getDescripcionRol(): string {
    return this.descripcionRol;
  }

  public getEstadoRol(): boolean {
    return this.estadoRol;
  }

  public getPermisos(): AbstractPermiso[] {
    return this.permisos;
  }

  //Setters con validaciones -------------------
  public setIdRol(id: number): void {
    this.idRol = this.validateIdRol(id);
  }

  public setNombreRol(nombre: string): void {
    this.nombreRol = this.validateNombreRol(nombre);
  }

  public setDescripcionRol(descripcion: string): void {
    this.descripcionRol = descripcion;
  }

  public setEstadoRol(estado: boolean): void {
    this.estadoRol = estado;
  }

  public setPermisos(permisos: AbstractPermiso[]): void {
    this.permisos = this.validatePermisos(permisos);
  }

  //Validación ---------------------
  private validateIdRol(id: number): number {
    if (id <= 0) {
      throw new Error("El ID del rol debe ser un número entero positivo.");
    }
    return id;
  }

  private validateNombreRol(nombre: string): string {
    if (nombre.trim().length === 0) {
      throw new Error("El nombre del rol no puede estar vacío.");
    }
    return nombre.trim();
  }

  private validatePermisos(permisos: AbstractPermiso[]): AbstractPermiso[] {
    if (!Array.isArray(permisos) || permisos.length <= 0) {
      throw new Error("Los permisos deben ser un array de almenos 0 .");
    }
    return permisos;
  }
}
