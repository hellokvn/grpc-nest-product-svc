import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductRequestDto, FindOneRequestDto, DecreaseStockRequestDto } from './product.dto';
import { CreateProductResponse, FindOneResponse, PRODUCT_SERVICE_NAME, DecreaseStockResponse } from './product.pb';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  @Inject(ProductService)
  private readonly service: ProductService;

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  private createProduct(payload: CreateProductRequestDto): Promise<CreateProductResponse> {
    return this.service.createProduct(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'FindOne')
  private findOne(payload: FindOneRequestDto): Promise<FindOneResponse> {
    return this.service.findOne(payload);
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DecreaseStock')
  private decreaseStock(payload: DecreaseStockRequestDto): Promise<DecreaseStockResponse> {
    return this.service.decreaseStock(payload);
  }
}
