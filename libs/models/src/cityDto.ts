import { countryDto } from '@booking/models/country.dto';

export interface CityDto {
    id?: string;
    name?: string;
    country?: countryDto;
}
