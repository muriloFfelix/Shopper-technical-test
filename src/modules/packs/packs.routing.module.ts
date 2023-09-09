import { Module } from '@nestjs/common';
import { PacksModule } from './packs.module';
import { PacksController } from './controllers/packs.controller';

@Module({
  imports: [
    PacksModule,
  ],
  controllers: [
    PacksController,
  ]
})
export class PacksRoutingModule { }
