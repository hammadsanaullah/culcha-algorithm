import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
// import { CronjobsService } from './cronjobs/cronjobs.service';

@Module({
  providers: [PrismaService],
})
export class ServicesModule {}
