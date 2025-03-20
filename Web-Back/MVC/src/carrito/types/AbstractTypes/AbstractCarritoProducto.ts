import AbstractProducto from "../../../producto/types/AbstractTypes/AbstractProducto";
import CarritoProducto from "../interface/CarritoProductoInterface";

export default abstract class AbstractCarritoProducto {
    protected idCarritoProducto: number;
    protected idProducto: AbstractProducto[];
    protected horaCarritoProducto: Date[];

    constructor(carritoProductoInterface: CarritoProducto) {
        this.idCarritoProducto = this.validateIdCarritoProducto(carritoProductoInterface.idCarritoProducto);
        this.idProducto = this.validateIdProducto(carritoProductoInterface.idProducto);
        this.horaCarritoProducto = this.validateHoraCarritoProducto(carritoProductoInterface.horaCarritoProducto);
    }

    public abstract isNull(): boolean;

    //Getters -----------------------------------
    public getIdCarritoProducto(): number {
        return this.idCarritoProducto;
    }

    public getIdProducto(): AbstractProducto[] {
        return this.idProducto;
    }

    public getHoraCarritoProducto(): Date[] {
        return this.horaCarritoProducto;
    }

    //Setters con validaciones -------------------
    public setIdCarritoProducto(id: number): void {
        this.idCarritoProducto = this.validateIdCarritoProducto(id);
    }

    public setIdProducto(productos: AbstractProducto[]): void {
        this.idProducto = this.validateIdProducto(productos);
    }

    public setHoraCarritoProducto(horas: Date[]): void {
        this.horaCarritoProducto = this.validateHoraCarritoProducto(horas);
    }

    //Validación ---------------------
    private validateIdCarritoProducto(id: number): number {
        if (id <= 0) {
            throw new Error("El ID del carrito producto debe ser un número entero positivo.");
        }
        return id;
    }

    private validateIdProducto(productos: AbstractProducto[]): AbstractProducto[] {
        if (!Array.isArray(productos) || productos.length <= 0) {
            throw new Error("El carrito debe contener al menos 0 productos.");
        }
        return productos;
    }

    private validateHoraCarritoProducto(horas: Date[]): Date[] {
        if (!Array.isArray(horas)) {
            throw new Error("Las horas deben ser un arreglo de fechas.");
        }
    
        for (const hora of horas) {
            if (!(hora instanceof Date) || isNaN(hora.getTime())) {
                throw new Error("Cada elemento del arreglo debe ser una fecha válida.");
            }
        }
    
        return horas;
    }
    
}
