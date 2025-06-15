import { Tournament as PrismaTournament, $Enums } from '@prisma/client';
import { Tournament } from '../../domain/entities/tournament.entity';

export const TournamentMapper = {
  toDomain(prisma: PrismaTournament): Tournament {
    return new Tournament({
      id: prisma.id,
      name: prisma.name,
      gameName: prisma.gameName as string, // si es enum, convierte a string
      startDate: prisma.startDate,
      maxSlots: prisma.maxSlots,
      mode: prisma.mode as string,
      rules: prisma.rules ?? undefined, // transforma null en undefined si tu clase lo espera así
      prizes: prisma.prizes ?? undefined,
      status: prisma.status as string,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      deletedAt: prisma.deletedAt ?? undefined,
    });
  },
};
