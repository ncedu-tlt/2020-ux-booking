import { CountryModel } from './country.model';

export type CityModel = {
  name: string;
  country: CountryModel;
};
