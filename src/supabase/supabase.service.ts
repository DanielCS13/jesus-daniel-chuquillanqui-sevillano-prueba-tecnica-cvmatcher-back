import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key are required');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async insertData(table: string, data: Record<string, any>) {
    const { data: result, error } = await this.supabase
      .from(table)
      .insert([data]);
    if (error) throw new Error(error.message);
    return result;
  }

  async getData<T>(tableName: string): Promise<T[]> {
    const { data, error } = await this.supabase.from(tableName).select('*');

    if (error) {
      throw new Error(`Error obteniendo datos de Supabase: ${error.message}`);
    }

    return data as T[]; // Cast seguro
  }
}
