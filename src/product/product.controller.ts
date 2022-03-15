import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateRequestDto, FindOneRequestDto } from './product.dto';
import { Product } from './product.entity';
import { CreateResponse, FindOneResponse, PRODUCT_SERVICE_NAME } from './product.pb';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'Create')
  private async create(payload: CreateRequestDto): Promise<CreateResponse> {
    const product: Product = await this.service.create(payload);

    if (!product) {
      return { id: null, error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    }

    return { id: product.id, error: null, status: HttpStatus.OK };
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  private async findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    const product: Product = await this.service.findOne(payload);

    if (!product) {
      return { data: null, error: ['Product not found'], status: HttpStatus.NOT_FOUND };
    }

    return { data: product, error: null, status: HttpStatus.OK };
  }
}
