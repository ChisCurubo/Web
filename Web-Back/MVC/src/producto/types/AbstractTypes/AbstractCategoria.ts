import { Categoria } from "../interface/CategoriaInterface";

export default abstract class AbstractCategoria {
    protected idCategoria: number;
    protected nombreCategoria: string;
    protected descripcion: string;

    constructor(categoriaAttributes: Categoria) {
        this.idCategoria = this.validateIdCategoria(categoriaAttributes.idCategoria);
        this.nombreCategoria = this.validateNombreCategoria(categoriaAttributes.nombreCategoria);
        this.descripcion = categoriaAttributes.descripcion;
    }

    public abstract isNull(): boolean;

    //Getters -----------------------------------
    public getIdCategoria(): number {
        return this.idCategoria;
    }

    public getNombreCategoria(): string {
        return this.nombreCategoria;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }

    //Setters con validaciones -------------------
    public setIdCategoria(id: number): void {
        this.idCategoria = this.validateIdCategoria(id);
    }

    public setNombreCategoria(nombre: string): void {
        this.nombreCategoria = this.validateNombreCategoria(nombre);
    }

    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    //Validación ---------------------
    private validateIdCategoria(id: number): number {
        if (id <= 0) {
            throw new Error("El ID de la categoría debe ser un número entero positivo.");
        }
        return id;
    }

    private validateNombreCategoria(nombre: string): string {
        if (nombre.trim().length === 0) {
            throw new Error("El nombre de la categoría no puede estar vacío.");
        }
        return nombre.trim();
    }

}
