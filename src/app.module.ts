import { Module } from '@nestjs/common';
import { ScrappingModule } from './scrapping/scrapping.module';
import { SupabaseModule } from './supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [ScrappingModule, ConfigModule.forRoot(), SupabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
