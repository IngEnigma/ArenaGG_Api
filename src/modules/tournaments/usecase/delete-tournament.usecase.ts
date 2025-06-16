import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma/prisma.service';

@Injectable()
export class DeleteTournamentUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(id: number) {
    const existing = await this.prisma.tournament.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Torneo no encontrado');

    await this.prisma.tournament.delete({ where: { id } });

    return { message: 'Torneo eliminado exitosamente' };
  }
}
