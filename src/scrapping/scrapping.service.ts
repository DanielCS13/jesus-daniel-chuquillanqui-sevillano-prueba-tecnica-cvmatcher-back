import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { lastValueFrom } from 'rxjs';
import { DateService } from 'src/date/date.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { ROLES } from 'src/auth/roles.decorator';
import { JobOffer } from './jobOffer.interface';

@Injectable()
export class ScrappingService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dateService: DateService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async scrapeWebsite(url: string, role: string) {
    const response = await lastValueFrom(this.httpService.get(url));
    const $ = cheerio.load(response.data as string);

    const informationDiv = $(
      'div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8',
    );

    const title = informationDiv.find('h2').text().trim();
    const business = informationDiv.find('h5').first().text().trim();
    const aditionalInformation = informationDiv
      .find('div[variant="body2"]')
      .text()
      .trim();

    const targetDiv = $(`a[aria-label="Vacantes ${title}"]`)
      .find('div')
      .first();

    const locationSpecific = targetDiv
      .find('ul li:first-child span')
      .text()
      .trim();

    const publishedDate = this.dateService.parseRelativeTime(
      targetDiv.find('p').last().text().trim(),
    );

    const data = {
      title,
      aditionalInformation,
      business,
      locationSpecific,
      publishedDate,
    };

    await this.supabaseService.insertData('job-offer', data);

    return {
      title,
      ...(role === ROLES.PRO || role === ROLES.ADMIN
        ? { aditionalInformation }
        : {}),
      ...(role === ROLES.ADMIN
        ? { business, locationSpecific, publishedDate }
        : {}),
    };
  }

  async getStoredData(role: string): Promise<Partial<JobOffer>[]> {
    const data = await this.supabaseService.getData<JobOffer>('job-offer');

    return data.map(
      ({
        title,
        aditionalInformation,
        business,
        locationSpecific,
        publishedDate,
      }) => ({
        title,
        ...(role === ROLES.PRO || role === ROLES.ADMIN
          ? { aditionalInformation }
          : {}),
        ...(role === ROLES.ADMIN
          ? { business, locationSpecific, publishedDate }
          : {}),
      }),
    );
  }
}
