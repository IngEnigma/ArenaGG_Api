import { Body, Controller, Post, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { CreateTournamentDto } from '../dtos/request/create-tournament.dto';
import { CreateTournamentUseCase } from '../usecase/create-tournament.usecase';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Role } from '../../../common/decorators/roles.decorator';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly createTournamentUseCase: CreateTournamentUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  async create(@Body() dto: CreateTournamentDto) {
    return await this.createTournamentUseCase.execute(dto);
  }
}
