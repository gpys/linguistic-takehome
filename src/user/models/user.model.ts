import { Field, ObjectType, Int } from '@nestjs/graphql';

import type { User as UserModel } from '@prisma/client';

import { Document } from '../../document/models/document.model'

@ObjectType()
export class User implements UserModel {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  //added here. return array of documents associated with user
  @Field(type => [Document], {nullable: 'items'})
  documents: Document[];
}
