import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma';

import { UserResolver } from './user.resolver';
import { UserService } from './user.service';


//added document service as provider
import { DocumentService } from 'src/document/document.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver, DocumentService],
  exports: [UserResolver],
})
export class UserModule {}
