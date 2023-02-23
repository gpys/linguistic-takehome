import { Field, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class Document { //implements DocumentModel
    @Field(type => Int)
    id: number;

    @Field()
    title: string;

    @Field()
    text: string;

    @Field(type => Int)
    authorID: number //userID

    @Field()
    createdAt: Date;
    //set default to now

    @Field({nullable: true})
    updatedAt?: Date;
    
}