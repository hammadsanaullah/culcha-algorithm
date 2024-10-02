import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ScheduleModule.forRoot(), SharedModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
