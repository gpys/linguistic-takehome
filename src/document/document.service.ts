import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma'

import type { SaveDocumentInput } from './document.resolver';

@Injectable()
export class DocumentService {
    constructor(private prismaService: PrismaService) {}

  async saveDocument(saveDocumentData: SaveDocumentInput): Promise<Document> {
    const { title, text, authorID } = saveDocumentData;
    const newDocument = await this.prismaService.document.create({
        data: {
            title,
            text,
            authorID
        },
    });

    return newDocument;
  }


  //want this method in userservice class with parent info
  async documents(authorID: number): Promise<[Document]> {

    return this.prismaService.document.findMany({
        where: {
            authorID,
        },
    });
  }

  async getDocument(id: number): Promise<Document> {

    return this.prismaService.document.findUniqueOrThrow({
        where: {
            id,
        },
    });
  }

}