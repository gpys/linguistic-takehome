import { Args, 
         Query, 
         Resolver,
         Int,
         InputType,
         Field,
         Mutation } from '@nestjs/graphql'

import { Document } from './models/document.model'
import { DocumentService } from './document.service'



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
    document(@Args('id', {type: () => Int}) id: number) {
      return this.documentService.getOneDocument(id);
    }
  

  @Query(returns => [Document])
    documents(@Args('id', {type: () => Int}) id: number) {
        return this.documentService.getAllDocuments(id);
    }

  @Mutation(returns => Document)
    saveDocument(
      @Args('input') input: SaveDocumentInput //name argument 'input' for maintainability
      ) {
        return this.documentService.createDocument(input)
      }
}