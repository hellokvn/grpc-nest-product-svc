import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductRequestDto, DecreaseStockRequestDto, FindOneRequestDto } from './product.dto';
import { CreateProductResponse, DecreaseStockResponse, FindOneResponse } from './product.pb';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  public async findOne({ id }: FindOneRequestDto): Promise<FindOneResponse> {
    const product: Product = await this.repository.findOne({ where: { id } });

    if (!product) {
      return { data: null, error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    }
    return { data: product, error: null, status: HttpStatus.OK };
  }

  public async createProduct(payload: CreateProductRequestDto): Promise<CreateProductResponse> {
    const product: Product = new Product();

    product.name = payload.name;
    product.sku = payload.sku;
    product.stock = payload.stock;
    product.price = payload.price;

    await this.repository.save(product);

    return { id: product.id, error: null, status: HttpStatus.OK };
  }

  public async decreaseStock({ id }: DecreaseStockRequestDto): Promise<DecreaseStockResponse> {
    const product: Product = await this.repository.findOne({ where: { id } });

    if (!product) {
      return { error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    } else if (product.stock <= 0) {
      return { error: ['Stock too low'], status: HttpStatus.CONFLICT };
    }

    this.repository.update(product.id, { stock: product.stock - 1 });

    return { error: null, status: HttpStatus.OK };
  }
}
