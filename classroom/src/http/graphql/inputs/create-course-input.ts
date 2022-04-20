import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCouseInput {
  @Field()
  title: string;
}
