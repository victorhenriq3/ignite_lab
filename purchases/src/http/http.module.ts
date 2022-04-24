import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { MessagingModule } from 'src/messaging/messaging.module';
import { CustomerService } from 'src/services/custumers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchaseServices } from 'src/services/purchase.service';
import { CustomerResolver } from './graphql/resolvers/customers.resolver';
import { ProductResolver } from './graphql/resolvers/product.resolver';
import { PurchaseResolver } from './graphql/resolvers/puchases.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    MessagingModule,
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
    CustomerResolver,
    CustomerService,
  ],
})
export class HttpModule {}
