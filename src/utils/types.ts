import { Prisma } from '@prisma/client';

export type WorkoutWithDetails = Prisma.WorkoutGetPayload<{
  include: {
    WorkoutParts: {
      include: {
        breaks: true;
        comments: true;
        partExercises: {
          include: {
            exercise: true;
          };
        };
        generatedExercises: true;
      };
    };
    excludedAthletesWorkout: true;
  };
}>;
