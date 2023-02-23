import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DocumentService', () => {
    let documentService: DocumentService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DocumentService, {
                provide: PrismaService,
                useValue: {
                    document: {
                        create: jest.fn(),
                        findMany: jest.fn(),
                        findUniqueOrThrow: jest.fn(),
                    }
                }
            }
            ],
        }).compile();

        documentService = module.get<DocumentService>(DocumentService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(documentService).toBeDefined();
    });

    describe('createDocument', () => {
        it('should save new document with correct "title", "text", "authorID" fields', async () => {
            const saveDocumentData = {
                title: 'test document',
                text: 'contents of test document',
                authorID: 1,
            };

            await documentService.createDocument(saveDocumentData);

            expect(prismaService.document.create).toHaveBeenCalledWith({
                data: saveDocumentData,
            });
        });

        it('should return saved document', async () => {
            const saveDocumentData = {
                title: 'test document',
                text: 'contents of test document',
                authorID: 1,
            };

            const savedDocument = {id: 1, ...saveDocumentData};

            (prismaService.document.create as jest.Mock).mockResolvedValueOnce(savedDocument);

            const result = await documentService.createDocument(saveDocumentData);

            expect(result).toEqual(savedDocument);
        })

    })

    //todo write tests for other methods
    describe('getAllDocuments', () => {
        it('should call prismaService.document.findMany method with correct authorID', async () => {
            const authorID = 1;

            await documentService.getAllDocuments(authorID);

            expect(prismaService.document.findMany).toHaveBeenCalledWith({
                where: {
                    authorID,
                },
            });

        });

        it('should return list of documents with correct authorID', async () => {
            const authorID = 1;
            const documents = [
                { id: 1, title: 'Document 1', text: 'contents of Document 1', authorID },
                { id: 2, title: 'Document 2', text: 'contents of Document 2', authorID }
            ];

            (prismaService.document.findMany as jest.Mock).mockResolvedValueOnce(documents);

            const result = await documentService.getAllDocuments(authorID);

            expect(result).toEqual(documents);
        });
    });

    describe('getOneDocument', () => {
        it('should call prismaService.document.findUniqueOrThrow method with correct document id', async () => {
            const id = 1;

            await documentService.getOneDocument(id);

            expect(prismaService.document.findUniqueOrThrow).toHaveBeenCalledWith({
                where: {
                    id,
                },
            });
        })

        it('should return document with passed in id', async () => {
            const id = 1;
            const document = { id, title: 'document title', text: 'content of document', authorID: 1 };

            (prismaService.document.findUniqueOrThrow as jest.Mock).mockResolvedValueOnce(document);

            const result = await documentService.getOneDocument(id);

            expect(result).toEqual(document);
        });

        it('should throw an error if no document with passed id is found', async () => {
            const id = 1;
            const error = new Error(`no document with id: ${id} could be found`);

            (prismaService.document.findUniqueOrThrow as jest.Mock).mockRejectedValueOnce(error);

            expect(documentService.getOneDocument(id)).rejects.toThrow(error);

        });


    });





});