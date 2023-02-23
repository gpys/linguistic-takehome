import { Args, Query, ResolveField, Resolver, Parent} from '@nestjs/graphql';

import { User } from './models/user.model';
import { UserService } from './user.service';

import { Document } from '../document/models/document.model'
import { DocumentService } from '../document/document.service'

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private documentService: DocumentService,
    ) {}

  @Query(() => User)
  user(@Args('id') id: number) {
    return this.userService.findByID(id);
  }

//document resolve field for returning Documents associated with user
@ResolveField('documents', returns => [Document])
documents(@Parent() user: User) {
  const { id } = user
  return this.documentService.getAllDocuments(id);
}
}
