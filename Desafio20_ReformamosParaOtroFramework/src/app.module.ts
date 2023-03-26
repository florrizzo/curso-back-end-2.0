import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot('mongodb+srv://coder:zI3QtpPlq3n6umJ6@dateelgusto.fwvjhhb.mongodb.net/dateelgusto')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
