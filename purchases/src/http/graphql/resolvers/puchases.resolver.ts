import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/currentUser';
import { ProductsService } from 'src/services/products.service';
import { PurchaseServices } from 'src/services/purchase.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchaseResolver {
  constructor(
    private purchasesService: PurchaseServices,
    private productService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    return null;
  }
}
