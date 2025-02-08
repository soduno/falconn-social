import { Controller, Get, Req } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly service: CountriesService) {}

  @Get()
  countries(@Req() req: Request) {
    return this.service.getCountriesList();
  }
}
