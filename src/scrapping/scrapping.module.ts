import { Module } from '@nestjs/common';
import { ScrappingService } from './scrapping.service';
import { ScrappingController } from './scrapping.controller';
import { HttpModule } from '@nestjs/axios';
import { DateModule } from 'src/date/date.module';
import { AuthModule } from 'src/auth/auth.module';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [HttpModule, DateModule, AuthModule, SupabaseModule],
  controllers: [ScrappingController],
  providers: [ScrappingService],
})
export class ScrappingModule {}
