import { ActivityLevel, DogSize } from '@prisma/client';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import { prisma } from '../../../prismaClient';

interface AddDogBody {
  name: string;
  size: DogSize;
  birthDate: string;
  activityLevel: ActivityLevel;
  image: string | null;
}

interface SuccessResponse {
  dog: {
    name: string;
    size: DogSize;
    activityLevel: ActivityLevel;
    image: string | null;
  };
  message: string;
}

interface ErrorResponse {
  error: string;
}

type AddDogResponse = SuccessResponse | ErrorResponse;

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<AddDogResponse>> {
  console.log('API Route hit: /api/addFirstDog');

  try {
    const body: AddDogBody = await request.json();

    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return ExpoApiResponse.json(
        { error: 'Not authenticated' },
        { status: 401 },
      );
    }

    const sessionToken = authHeader.replace('Bearer ', '');

    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return ExpoApiResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 },
      );
    }

    const newDog = await prisma.dog.create({
      data: {
        name: body.name,
        size: body.size,
        birthDate: new Date(body.birthDate),
        activityLevel: body.activityLevel,
        image: body.image,
        ownerId: session.user.id,
        preferences: {
          create: {
            prefersSmallDogs: true,
            prefersMediumDogs: true,
            prefersLargeDogs: true,
            prefersPuppy: true,
            prefersYoung: true,
            prefersAdult: true,
            prefersSenior: true,
          },
        },
      },
      include: {
        preferences: true,
      },
    });

    return ExpoApiResponse.json(
      {
        dog: {
          name: newDog.name,
          size: newDog.size,
          activityLevel: newDog.activityLevel,
          image: newDog.image,
        },
        message: 'Dog added successfully',
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Add dog error:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to add dog';
    return ExpoApiResponse.json({ error: errorMessage }, { status: 500 });
  }
}
