import { Permiso } from "../interface/PermisoInterface";

export default abstract class AbstractPermiso {
    protected idPermiso: number;
    protected nombrePermiso: string;
    protected tipo: string;
    protected estadoPermiso: boolean;

    constructor(permisoAttributes: Permiso) {
        this.idPermiso = this.validateIdPermiso(permisoAttributes.idPermiso);
        this.nombrePermiso = this.validateNombrePermiso(permisoAttributes.nombrePermiso);
        this.tipo = this.validateTipo(permisoAttributes.tipo);
        this.estadoPermiso = permisoAttributes.estadoPermiso;
    }

    public abstract isNull(): boolean;

    //Getters -----------------------------------
    public getIdPermiso(): number {
        return this.idPermiso;
    }

    public getNombrePermiso(): string {
        return this.nombrePermiso;
    }

    public getTipo(): string {
        return this.tipo;
    }

    public getEstadoPermiso(): boolean {
        return this.estadoPermiso;
    }

    //Setters con validaciones -------------------
    public setIdPermiso(id: number): void {
        this.idPermiso = this.validateIdPermiso(id);
    }

    public setNombrePermiso(nombre: string): void {
        this.nombrePermiso = this.validateNombrePermiso(nombre);
    }

    public setTipo(tipo: string): void {
        this.tipo = this.validateTipo(tipo);
    }

    public setEstadoPermiso(estado: boolean): void {
        this.estadoPermiso = estado;
    }

    //Validación ---------------------
    private validateIdPermiso(id: number): number {
        if (id <= 0) {
            throw new Error("El ID del permiso debe ser un número entero positivo.");
        }
        return id;
    }

    private validateNombrePermiso(nombre: string): string {
        if (nombre.trim().length === 0) {
            throw new Error("El nombre del permiso no puede estar vacío.");
        }
        return nombre.trim();
    }

    private validateTipo(tipo: string): string {
        if (tipo.trim().length === 0) {
            throw new Error("El tipo de permiso no puede estar vacío.");
        }
        return tipo.trim();
    }
}
