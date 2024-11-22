import { ExpoApiResponse } from '../../../ExpoApiResponse';
import { prisma } from '../../../prismaClient';

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<{ message: string } | { error: string }>> {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return ExpoApiResponse.json(
        { error: 'Verification code is required' },
        { status: 400 },
      );
    }

    const user = await prisma.owner.findFirst({
      where: {
        verificationCode: code,
        verified: false,
      },
    });

    if (!user) {
      return ExpoApiResponse.json(
        { error: 'Invalid or expired verification code' },
        { status: 400 },
      );
    }

    await prisma.owner.update({
      where: {
        id: user.id,
      },
      data: {
        verified: true,
        verificationCode: null,
      },
    });

    return ExpoApiResponse.json(
      { message: 'Email verified successfully! You can now log in.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Verification error:', error);
    return ExpoApiResponse.json(
      { error: 'Verification failed' },
      { status: 500 },
    );
  }
}
