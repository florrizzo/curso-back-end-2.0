import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    Delete,
  } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(@Body('title') prodTitle: string, 
  @Body('thumbnail') prodThumbnail: string, 
  @Body('description') prodDescription: string, 
  @Body('price') prodPrice: number
  ) {
    const generateId = await this.productsService.create(prodTitle, prodThumbnail, prodDescription, prodPrice);
    return { id: generateId}
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('thumbnail') prodThumbnail: string,
    @Body('descripcion') prodDescripcion: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(prodId, prodTitle, prodDescripcion, prodThumbnail, prodPrice);
    return "Product updated"
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId) 
    return "Product deleted"
    }
}
