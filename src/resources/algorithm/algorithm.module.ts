import { Module } from '@nestjs/common';
import { AlgorithmService } from './algorithm.service';
import { AlgorithmController } from './algorithm.controller';
import { ServicesModule } from '../../shared/services/services.module';
import { SharedModule } from '../../shared/shared.module';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { CronjobsService } from '../../shared/services/cronjobs/cronjobs.service';

@Module({
  imports: [SharedModule, ServicesModule],
  controllers: [AlgorithmController],
  providers: [AlgorithmService, PrismaService, CronjobsService],
})
export class AlgorithmModule {}
