import { Module } from '@nestjs/common';
import { AlgorithmModule } from './algorithm/algorithm.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [AlgorithmModule, SharedModule],
})
export class ResourcesModule {}
