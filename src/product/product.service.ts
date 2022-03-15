import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateRequestDto, FindOneRequestDto } from './product.dto';

@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private readonly repository: Repository<Product>;

  public findOne({ id }: FindOneRequestDto): Promise<Product> {
    return this.repository.findOne(id);
  }

  public create(payload: CreateRequestDto): Promise<Product> {
    const product: Product = new Product();

    product.name = payload.name;
    product.sku = payload.sku;
    product.stock = payload.stock;
    product.price = payload.price;

    return this.repository.save(product);
  }
}
