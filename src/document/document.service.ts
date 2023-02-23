import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma';

import type { SaveDocumentInput } from './document.resolver';
import type { Document } from './models/document.model';

@Injectable()
export class DocumentService {
    constructor(private prismaService: PrismaService) {}

  async createDocument(saveDocumentData: SaveDocumentInput): Promise<Document> {
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


  getAllDocuments(authorID: number): Promise<Document[]> {

    return this.prismaService.document.findMany({
        where: {
            authorID,
        },
    });
  }

  getOneDocument(id: number): Promise<Document> {

    return this.prismaService.document.findUniqueOrThrow({
        where: {
            id,
        },
    });
  }

}