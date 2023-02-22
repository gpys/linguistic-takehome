import { Args, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql';

import { User } from './models/user.model';
import { UserService } from './user.service';

import { Document } from '../document/models/document.model'
//import { DocumentService } from //create doc service

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@Args('id') id: number) {
    return this.userService.findByID(id);
  }

}
