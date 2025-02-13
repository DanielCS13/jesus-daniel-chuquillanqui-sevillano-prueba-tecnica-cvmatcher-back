import { Module } from '@nestjs/common';
import { ScrappingModule } from './scrapping/scrapping.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ScrappingModule, ConfigModule.forRoot(), SupabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
