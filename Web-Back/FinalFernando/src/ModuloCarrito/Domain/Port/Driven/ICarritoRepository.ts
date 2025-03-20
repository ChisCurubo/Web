import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import AbstractCarrito from "../../Carrito/AbstractCarrito";
import { ICarritoCompleto, ITotalesCarrito } from "../../Carrito/interfaces/carritointerfaces";
import AbstractItemCarrito from "../../iItemCarrito/AbstractItemCarrito";
import { IItemCarritoResumen } from "../../iItemCarrito/Interfaces/ItemCarritoInterfaces";

export interface ICarritoRepository extends RepositoryInterface {
    findByUsuarioId(usuarioId: number): Promise<AbstractCarrito>;
    addItem(usuarioId: number, productoId: number, cantidad: number): Promise<void>;
    removeItem(usuarioId: number, productoId: number): Promise<void>;
    increaseItemQuantity(usuarioId: number, productoId: number): Promise<number>;
    decreaseItemQuantity(usuarioId: number, productoId: number): Promise<number>;
    getItems(usuarioId: number): Promise<AbstractItemCarrito[]>;
    calcularTotalesCarrito(idUsuario: number): Promise<ITotalesCarrito>;
    calcularTotalesCarritoCompleto(idUsuario: number): Promise<ITotalesCarrito>;
    verMiCarritoCompleto(usuarioId: number): Promise<ICarritoCompleto>;
    VerMiCarritoResumen(usuarioId: number): Promise<IItemCarritoResumen[]>;
}