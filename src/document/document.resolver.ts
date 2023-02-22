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
//import { DocumentService } from //create doc service

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
    //documentservice

  @Query(returns => Document)
    getDocument(@Args('id', {type: () => Int}) id: number) {
      return // create documentservice this.documentService.findOneByID(id)
    }
  @ResolveField('documents', returns => [Document])
    documents(@Parent() author: User) {
      const { id } = author
      return // this.documentService.findAll({authorID: id})
    }

@Mutation(returns => Document)
  saveDocument(
    @Args('saveDocumentData') saveDocumentData: SaveDocumentInput
    ) {
    //    return this.documentService.saveDocument
    }
}