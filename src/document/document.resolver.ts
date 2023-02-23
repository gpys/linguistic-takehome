import { Args, 
         Query, 
         Resolver,
         ResolveField, 
         Parent, 
         Int,
         //ArgsType,
         InputType,
         Field,
         Mutation } from '@nestjs/graphql'

import { Document } from './models/document.model'
import { DocumentService } from './document.service'

import { User } from '../user/models/user.model';

//type for document mutation
@InputType()
export class SaveDocumentInput {
    @Field()
    title: string

    @Field()
    text: string

    @Field(type => Int)
    authorID: number
}

@Resolver(of => Document)
export class DocumentResolver {
    constructor(private documentService: DocumentService) {}

  @Query(returns => Document)
    getDocument(@Args('id', {type: () => Int}) id: number) {
      return this.documentService.getOneDocument(id);
    }
    //confirm where parent needs to be defined
//   @ResolveField('documents', returns => [Document])
//     documents(@Parent() author: User) {
//       const { id } = author
//       return this.documentService.getAllDocuments(id);
//     }

  @Query(returns => [Document])
    documents(@Args('id', {type: () => Int}) id: number) {
        return this.documentService.getAllDocuments(id);
    }

@Mutation(returns => Document)
  saveDocument(
    @Args('saveDocumentData') saveDocumentData: SaveDocumentInput
    ) {
      return this.documentService.createDocument(saveDocumentData)
    }
}