export interface IProductoQueries {
  findByPriceRange(min: number, max: number): Promise<any[]>;
  findById(id: number): Promise<any[]>;
  findByName(nombre: string): Promise<any[]>;
  search(termino: string): Promise<any[]>;
  getShowcase(): Promise<any[]>;
}