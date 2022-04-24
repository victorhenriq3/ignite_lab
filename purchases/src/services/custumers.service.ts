import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    return await this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
