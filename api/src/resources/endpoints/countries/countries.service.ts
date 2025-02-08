import { Injectable } from '@nestjs/common';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

@Injectable()
export class CountriesService {
  getCountriesList() {
    countries.registerLocale(enLocale);
    const countriesList = countries.getNames('en');
    return Object.entries(countriesList).map(([code, name]) => ({
      code,
      name,
    }));
  }
}
