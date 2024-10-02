import { Test, TestingModule } from '@nestjs/testing';
import { AlgorithmService } from './algorithm.service';
import { PrismaService } from '../../shared/services/prisma/prisma.service';
import { testAthlete, testGymSessionsRaceWeek } from './algorithm.service.mock';
import { SlotManager } from '../../utils/slotManager';
import { DAY, GYM_SESSION, WORKOUT_TYPE } from '@prisma/client';

const normalizeDates = (obj) => {
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value instanceof Date ? value.toISOString() : normalizeDates(value),
      ]),
    );
  }
  return obj;
};

describe('AlgorithmService', () => {
  let prismaService: PrismaService;
  let algorithmService: AlgorithmService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlgorithmService, PrismaService],
    }).compile();

    algorithmService = module.get<AlgorithmService>(AlgorithmService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should test rest days', async () => {
    const slotManagerOldWeek = new SlotManager([
      {
        sequence: 1,
        day: DAY.Monday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 2,
        day: DAY.Monday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 3,
        day: DAY.Tuesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 4,
        day: DAY.Tuesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 5,
        day: DAY.Wednesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 6,
        day: DAY.Wednesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 7,
        day: DAY.Thursday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 8,
        day: DAY.Thursday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 9,
        day: DAY.Friday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 10,
        day: DAY.Friday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 11,
        day: DAY.Saturday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 12,
        day: DAY.Saturday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 13,
        day: DAY.Sunday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 14,
        day: DAY.Sunday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
    ]);

    const slotManagerNewWeek = new SlotManager([
      {
        sequence: 1,
        day: DAY.Monday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 2,
        day: DAY.Monday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 3,
        day: DAY.Tuesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 4,
        day: DAY.Tuesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 5,
        day: DAY.Wednesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 6,
        day: DAY.Wednesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 7,
        day: DAY.Thursday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 8,
        day: DAY.Thursday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 9,
        day: DAY.Friday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 10,
        day: DAY.Friday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 11,
        day: DAY.Saturday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 12,
        day: DAY.Saturday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 13,
        day: DAY.Sunday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 14,
        day: DAY.Sunday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
    ]);

    expect(slotManagerNewWeek.checkRestDay(3, 9)).toBe(true);
    expect(slotManagerNewWeek.checkRestDay(4, 9)).toBe(true);
    expect(slotManagerNewWeek.checkRestDay(3, 10)).toBe(true);
    expect(slotManagerNewWeek.checkRestDay(4, 10)).toBe(true);
    expect(slotManagerNewWeek.checkRestDay(4, 11)).toBe(false);

    expect(slotManagerNewWeek.checkRestDay(5, 9)).toBe(false);

    expect(slotManagerNewWeek.checkRestDay(7, 9, slotManagerOldWeek)).toBe(true);
  });

  it('should test slotManager break rules logic', async () => {
    const slotManagerOldWeek = new SlotManager([
      {
        sequence: 1,
        day: DAY.Monday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 2,
        day: DAY.Monday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 3,
        day: DAY.Tuesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 4,
        day: DAY.Tuesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 5,
        day: DAY.Wednesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 6,
        day: DAY.Wednesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 7,
        day: DAY.Thursday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 8,
        day: DAY.Thursday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 9,
        day: DAY.Friday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 10,
        day: DAY.Friday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 11,
        day: DAY.Saturday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 12,
        day: DAY.Saturday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 13,
        day: DAY.Sunday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioIntervalRun],
      },
      {
        sequence: 14,
        day: DAY.Sunday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioLongCardioSession],
      },
    ]);

    const slotManagerNewWeek = new SlotManager([
      {
        sequence: 1,
        day: DAY.Monday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioSwim],
      },
      {
        sequence: 2,
        day: DAY.Monday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioBike],
      },
      {
        sequence: 3,
        day: DAY.Tuesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CoolDownGeneral],
      },
      {
        sequence: 4,
        day: DAY.Tuesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CoolDownGeneral],
      },
      {
        sequence: 5,
        day: DAY.Wednesday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioMixedErgSession],
      },
      {
        sequence: 6,
        day: DAY.Wednesday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioRow],
      },
      {
        sequence: 7,
        day: DAY.Thursday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioRow],
      },
      {
        sequence: 8,
        day: DAY.Thursday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioBike],
      },
      {
        sequence: 9,
        day: DAY.Friday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 10,
        day: DAY.Friday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [],
      },
      {
        sequence: 11,
        day: DAY.Saturday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 12,
        day: DAY.Saturday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 13,
        day: DAY.Sunday,
        session: GYM_SESSION.Morning,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioAssBike],
      },
      {
        sequence: 14,
        day: DAY.Sunday,
        session: GYM_SESSION.Evening,
        isAvailable: false,
        workoutTypesAssigned: [WORKOUT_TYPE.CardioRow],
      },
    ]);

    // 4 before previous week
    expect(slotManagerNewWeek.checkAssignedWorkoutTypes(4, [WORKOUT_TYPE.CardioAssBike], 2, slotManagerOldWeek)).toBe(
      true,
    );

    // 4 before
    expect(slotManagerNewWeek.checkAssignedWorkoutTypes(4, [WORKOUT_TYPE.CardioSwim], 5, slotManagerOldWeek)).toBe(
      true,
    );

    // 1 before previous week
    expect(
      slotManagerNewWeek.checkAssignedWorkoutTypes(4, [WORKOUT_TYPE.CardioLongCardioSession], 4, slotManagerOldWeek),
    ).toBe(true);

    // 1 before
    expect(
      slotManagerNewWeek.checkAssignedWorkoutTypes(1, [WORKOUT_TYPE.CardioMixedErgSession], 6, slotManagerOldWeek),
    ).toBe(true);

    // 1 after
    expect(
      slotManagerNewWeek.checkAssignedWorkoutTypes(1, [WORKOUT_TYPE.CardioMixedErgSession], 4, slotManagerOldWeek),
    ).toBe(true);

    // 4 after
    expect(slotManagerNewWeek.checkAssignedWorkoutTypes(4, [WORKOUT_TYPE.CardioRow], 10, slotManagerOldWeek)).toBe(
      true,
    );

    expect(slotManagerNewWeek.checkAssignedWorkoutTypes(4, [WORKOUT_TYPE.CardioRow], 13, slotManagerOldWeek)).toBe(
      true,
    );

    expect(slotManagerNewWeek.checkAssignedWorkoutTypes(1, [WORKOUT_TYPE.CardioRow], 12, slotManagerOldWeek)).toBe(
      false,
    );
  });

  // it('should be defined', () => {
  //   expect(algorithmService).toBeDefined();
  // });

  // it('should find a user', async () => {
  //   const user = await prismaService.user.findUnique({
  //     where: { id: 'cm0c9k4jy003he491r092aexr' },
  //   });

  //   expect(normalizeDates(user)).toEqual(testAthlete);
  // });

  // it('should handle race rules', async () => {
  //   await algorithmService.remove('cm0c9k4jy003he491r092aexr');
  //   await algorithmService.update('cm0c9k4jy003he491r092aexr');

  //   const requiredDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //   const requiredSessions = ['Morning', 'Evening'];

  //   requiredDays.forEach((day) => {
  //     requiredSessions.forEach((session) => {
  //       if (day === 'Friday' && session === 'Evening') {
  //         return; // Skip this combination
  //       }
  //       // Find if an entry exists for the given day and session
  //       const entryExists = testGymSessionsRaceWeek.some((entry) => entry.day === day && entry.gymSession === session);

  //       // Assert that the entry exists
  //       expect(entryExists).toBe(true);
  //     });
  //   });
  // });
});
