import { Producto } from "../interface/ProductoInterface";
import AbstractCategoria from "./AbstractCategoria";
import AbstractDescuento from "./../../../descuento/types/AbstractTypes/AbstractDescuento";

export default abstract class AbstractProducto {
  protected idProducto: number;
  protected nombreProducto: string;
  protected descripcionProducto: string;
  protected tallaProducto: string;
  protected precioProducto: number;
  protected estadoProducto: boolean;
  protected imgProducto: string;
  protected stockProducto: number;
  protected marcaProducto: string;
  protected categoria_id: AbstractCategoria;
  protected descuento_id: AbstractDescuento;

  constructor(productoAttributes: Producto) {
    this.idProducto = this.validateIdProducto(productoAttributes.idProducto);
    this.nombreProducto = this.validateNombreProducto(productoAttributes.nombreProducto);
    this.descripcionProducto = this.validateDescripcionProducto(productoAttributes.descripcionProducto);
    this.tallaProducto = this.validateTallaProducto(productoAttributes.tallaProducto);
    this.precioProducto = this.validatePrecioProducto(productoAttributes.precioProducto);
    this.estadoProducto = productoAttributes.estadoProducto;
    this.imgProducto = this.validateImgProducto(productoAttributes.imgProducto);
    this.stockProducto = this.validateStockProducto(productoAttributes.stockProducto);
    this.marcaProducto = this.validateMarcaProducto(productoAttributes.marcaProducto);
    this.categoria_id = productoAttributes.categoria_id;
    this.descuento_id = productoAttributes.descuento_id;
  }

  public abstract isNull: () => boolean;

  // Setters con validaciones
  public setIdProducto(idProducto: number): void {
    this.idProducto = this.validateIdProducto(idProducto);
  }

  public setNombreProducto(nombreProducto: string): void {
    this.nombreProducto = this.validateNombreProducto(nombreProducto);
  }

  public setDescripcionProducto(descripcionProducto: string): void {
    this.descripcionProducto = this.validateDescripcionProducto(descripcionProducto);
  }

  public setTallaProducto(tallaProducto: string): void {
    this.tallaProducto = this.validateTallaProducto(tallaProducto);
  }

  public setPrecioProducto(precioProducto: number): void {
    this.precioProducto = this.validatePrecioProducto(precioProducto);
  }

  public setEstadoProducto(estadoProducto: boolean): void {
    this.estadoProducto = estadoProducto;
  }

  public setImgProducto(imgProducto: string): void {
    this.imgProducto = this.validateImgProducto(imgProducto);
  }

  public setStockProducto(stockProducto: number): void {
    this.stockProducto = this.validateStockProducto(stockProducto);
  }

  public setMarcaProducto(marcaProducto: string): void {
    this.marcaProducto = this.validateMarcaProducto(marcaProducto);
  }

  public setCategoria(categoria_id: AbstractCategoria): void {
    this.categoria_id = categoria_id;
  }

  public setDescuento(descuento_id: AbstractDescuento): void {
    this.descuento_id = descuento_id;
  }

  // Getters
  public getIdProducto(): number {
    return this.idProducto;
  }

  public getNombreProducto(): string {
    return this.nombreProducto;
  }

  public getDescripcionProducto(): string {
    return this.descripcionProducto;
  }

  public getTallaProducto(): string {
    return this.tallaProducto;
  }

  public getPrecioProducto(): number {
    return this.precioProducto;
  }

  public getEstadoProducto(): boolean {
    return this.estadoProducto;
  }

  public getImgProducto(): string {
    return this.imgProducto;
  }

  public getStockProducto(): number {
    return this.stockProducto;
  }

  public getMarcaProducto(): string {
    return this.marcaProducto;
  }

  public getCategoria(): AbstractCategoria {
    return this.categoria_id;
  }

  public getDescuento(): AbstractDescuento {
    return this.descuento_id;
  }

  //Validación
  private validateIdProducto(id: number): number {
    if ( id <= 0) {
      throw new Error("El ID del producto debe ser un número entero positivo.");
    }
    return id;
  }

  private validateNombreProducto(nombre: string): string {
    if (!nombre.trim()) {
      throw new Error("El nombre del producto no puede estar vacío.");
    }
    return nombre;
  }

  private validateDescripcionProducto(descripcion: string): string {
    if (!descripcion.trim()) {
      throw new Error("La descripción del producto no puede estar vacía.");
    }
    return descripcion;
  }

  private validateTallaProducto(talla: string): string {
    if (!talla.trim()) {
      throw new Error("La talla del producto no puede estar vacía.");
    }
    return talla;
  }

  private validatePrecioProducto(precio: number): number {
    if ( precio < 0) {
      throw new Error("El precio del producto debe ser un número mayor o igual a 0.");
    }
    return precio;
  }


  private validateImgProducto(img: string): string {
    if (!img.trim()) {
      throw new Error("La imagen del producto no puede estar vacía.");
    }
    return img;
  }

  private validateStockProducto(stock: number): number {
    if (stock < 0) {
      throw new Error("El stock del producto debe ser un número entero mayor o igual a 0.");
    }
    return stock;
  }

  private validateMarcaProducto(marca: string): string {
    if (!marca.trim()) {
      throw new Error("La marca del producto no puede estar vacía.");
    }
    return marca;
  }

}
