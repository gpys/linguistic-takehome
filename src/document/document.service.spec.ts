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

});