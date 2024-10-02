import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AlgorithmService } from '../../../resources/algorithm/algorithm.service';
import { ROLE_TITLE } from '@prisma/client';

@Injectable()
export class CronjobsService {
  constructor(private readonly prisma: PrismaService, private readonly algorithmService: AlgorithmService) {}

  logger = new Logger(CronjobsService.name);

  // Triggers every saturday at midnight (UTC Time)
  @Cron('0 0 * * 6')
  // @Cron(CronExpression.EVERY_5_MINUTES) // For testing purposes
  async handleSchedulingGymSessions() {
    this.logger.debug('Cron job running at the start of Saturday.');
    try {
      const athleteRole = await this.prisma.role.findUnique({
        where: {
          title: ROLE_TITLE.ATHLETE,
        },
      });

      const athletes = await this.prisma.user.findMany({
        where: {
          roleId: athleteRole.id,
          blocked: null,
          deactivated: false,
          plans: {
            some: {
              current: true,
              plan: {
                type: {
                  not: 'fixed',
                },
              },
            },
          },
        },
        include: {
          plans: {
            include: {
              plan: true,
            },
          },
        },
      });

      await Promise.all(athletes.map((athlete) => this.algorithmService.update(athlete.id)));
    } catch (error) {
      this.logger.log(error);
    }
  }
}
