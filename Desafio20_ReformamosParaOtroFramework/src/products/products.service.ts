import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(
    title: string,
    thumbnail: string,
    description: string,
    price: number,
  ) {
    const newProduct = new this.productModel({
      title: title,
      thumbnail: thumbnail,
      description: description,
      price: price,
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      thumbnail: prod.thumbnail,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getSingleProduct(prodId: string) {
    const product = await this.findProduct(prodId);
    return {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    thumbnail: string,
    description: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (title) {
      updatedProduct.title = title;
    }
    if (thumbnail) {
      updatedProduct.thumbnail = thumbnail;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    updatedProduct.save();
  }

  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if (result.deletedCount === 0 ) {
        throw new NotFoundException ('Could not find product.')
    }
  }

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return product;
  }
}
