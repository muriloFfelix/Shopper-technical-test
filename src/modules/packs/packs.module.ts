import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PacksService } from './services/packs.service';
import { packsProviders } from './repository/pack-repository.provider';

@Module({
  imports: [
    DatabaseModule,
  ],
  exports: [
    PacksService,
  ],
  providers: [
    ...packsProviders,
    PacksService,
  ]
})
export class PacksModule { }
