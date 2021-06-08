import { CityDto } from '@booking/models/cityDto';

export interface AddressDto {
  street?: string;
  number?: number;
  part?: string;
  city?: string;
  country?: string;
}
