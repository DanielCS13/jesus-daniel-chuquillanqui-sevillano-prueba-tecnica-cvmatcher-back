import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { ROLES, Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('scraper')
export class ScrappingController {
  constructor(private readonly scrappingService: ScrappingService) {}

  @Get()
  @Roles(ROLES.ADMIN, ROLES.PRO, ROLES.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async scrape(
    @Query('url') url: string,
    @Request() req: { user: { role: string } },
  ) {
    return this.scrappingService.scrapeWebsite(url, req.user.role);
  }

  @Get('stored-data')
  @Roles(ROLES.ADMIN, ROLES.PRO, ROLES.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getStoredData(@Request() req: { user: { role: string } }) {
    return this.scrappingService.getStoredData(req.user.role);
  }
}
