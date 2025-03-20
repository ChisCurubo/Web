import { Descuento } from "../interface/DescuentosInterface";

export default abstract class AbstractDescuento {
    protected idDescuento: number;
    protected nombreDescuento: string;
    protected estadoDescuento: boolean;

    constructor(descuentoAttributes: Descuento) {
        this.idDescuento = this.validateIdDescuento(descuentoAttributes.idDescuento);
        this.nombreDescuento = this.validateNombreDescuento(descuentoAttributes.nombreDescuento);
        this.estadoDescuento = descuentoAttributes.estadoDescuento;
    }

    public abstract isNull(): boolean;

    //Getters -----------------------------------
    public getIdDescuento(): number {
        return this.idDescuento;
    }

    public getNombreDescuento(): string {
        return this.nombreDescuento;
    }

    public getEstadoDescuento(): boolean {
        return this.estadoDescuento;
    }

    //Setters con validaciones -------------------
    public setIdDescuento(id: number): void {
        this.idDescuento = this.validateIdDescuento(id);
    }

    public setNombreDescuento(nombre: string): void {
        this.nombreDescuento = this.validateNombreDescuento(nombre);
    }

    public setEstadoDescuento(estado: boolean): void {
        this.estadoDescuento = estado;
    }

    //Validación ---------------------
    private validateIdDescuento(id: number): number {
        if (id <= 0) {
            throw new Error("El ID del descuento debe ser un número entero positivo.");
        }
        return id;
    }

    private validateNombreDescuento(nombre: string): string {
        if (nombre.trim().length === 0) {
            throw new Error("El nombre del descuento no puede estar vacío.");
        }
        return nombre.trim();
    }

}
