import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { PurchaseServices } from 'src/services/purchase.service';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver()
export class PurchaseResolver {
  constructor(private purchasesService: PurchaseServices) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {}
}
