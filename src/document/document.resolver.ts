import { Args, Query, Resolver } from '@nestjs/graphql'

import { Document } from './models/document.model'

@Resolver(of => Document)
export class DocumentResolver {
    
}