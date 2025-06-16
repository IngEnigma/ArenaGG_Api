import { Body, Controller, Post, UseGuards, Req, ForbiddenException, Get, Param, Put, ParseIntPipe, Delete } from '@nestjs/common';
import { UpdateTournamentDto } from '../dtos/request/update-tournament.dto';
import { UpdateTournamentUseCase } from '../usecase/update-tournament.usecase';
import { FindAllTournamentsUseCase } from '../usecase/find-all-tournaments.usecase';
import { TournamentResponseDto } from '../dtos/response/tournament-response.dto';
import { CreateTournamentDto } from '../dtos/request/create-tournament.dto';
import { CreateTournamentUseCase } from '../usecase/create-tournament.usecase';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Role } from '../../../common/decorators/roles.decorator';
import { DeleteTournamentUseCase } from '../usecase/delete-tournament.usecase';

@Controller('tournaments')
export class TournamentController {
  constructor(private readonly createTournamentUseCase: CreateTournamentUseCase, 
              private readonly findAllTournaments: FindAllTournamentsUseCase,
              private readonly updateTournament: UpdateTournamentUseCase,
              private readonly deleteTournament: DeleteTournamentUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  async create(@Body() dto: CreateTournamentDto) {
    return await this.createTournamentUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<TournamentResponseDto[]> {
    return this.findAllTournaments.execute();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTournamentDto,
  ) {
    return this.updateTournament.execute(id, dto);
  }

@UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteTournament.execute(id);
  }
}
