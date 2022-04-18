import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from 'src/services/products.service';
import { PurchaseServices } from 'src/services/purchase.service';
import { ProductResolver } from './graphql/resolvers/product.resolver';
import { PurchaseResolver } from './graphql/resolvers/puchases.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    ProductResolver,
    ProductsService,
    PurchaseResolver,
    PurchaseServices,
  ],
})
export class HttpModule {}
