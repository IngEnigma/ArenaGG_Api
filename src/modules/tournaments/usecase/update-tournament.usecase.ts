import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';
import { UpdateTournamentDto } from '../dtos/request/update-tournament.dto';

@Injectable()
export class UpdateTournamentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number, dto: UpdateTournamentDto) {
  const existing = await this.prisma.tournament.findUnique({ where: { id } });
  if (!existing) throw new NotFoundException('Torneo no encontrado');

  return this.prisma.tournament.update({
    where: { id },
    data: {
      ...(dto.name && { name: dto.name }),
      ...(dto.gameName && { gameName: dto.gameName as any }),
      ...(dto.startDate && { startDate: new Date(dto.startDate) }),
      ...(dto.maxSlots !== undefined && { maxSlots: dto.maxSlots }),
      ...(dto.mode && { mode: dto.mode as any }),
      ...(dto.rules !== undefined && { rules: dto.rules }),
      ...(dto.requirements !== undefined && { requirements: dto.requirements }),
      ...(dto.prizes !== undefined && { prizes: dto.prizes }),
      ...(dto.bracketType && { bracketType: dto.bracketType as any }),
      ...(dto.status && { status: dto.status as any }),
    },
  });
}

}
