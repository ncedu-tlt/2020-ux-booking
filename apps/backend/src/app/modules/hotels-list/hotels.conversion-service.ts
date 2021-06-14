import { Address } from '../db/domain/addresses.dao';
import { AddressDto } from '@booking/models/addressDto';
import { Injectable } from '@nestjs/common';
import { Service } from '../db/domain/service.dao';
import { ServicesDto } from '@booking/models/services.dto';
import { ServiceType } from '../db/domain/service_type.dao';
import { ServiceTypeDto } from '@booking/models/serviceType.dto';
import { Photo } from '../db/domain/photo.dao';
import { PhotosDto } from '@booking/models/photos.dto';
import { MainPhotoDto } from '@booking/models/mainPhoto.dto';

@Injectable()
export class HotelsConversionService {
  convertAddressDaoToDto(address: Address): AddressDto {
    return {
      id: address?.id ?? '',
      country: address?.city.country.name ?? '',
      countryId: address?.city.country.id ?? '',
      city: address?.city.name ?? '',
      cityId: address?.city.id ?? '',
      street: address?.street ?? '',
      part: address?.part ?? '',
      number: address?.number ?? Number()
    };
  }

  convertServiceDaoToDto(service: Service[]): ServicesDto[] {
    return service.map(value => {
      return {
        id: value.id,
        name: value.name,
        price: value.price,
        icon: value.icon,
        category: value.category.name,
        categoryId: value.category.id
      } as ServicesDto;
    });
  }

  convertServiceTypeDaoToDto(serviceType: ServiceType): ServiceTypeDto {
    return {
      id: serviceType?.id ?? '',
      name: serviceType?.name ?? ''
    };
  }

  convertPhotoDaoToDto(photos: Photo[]): PhotosDto[] {
    return photos.map(value => {
      return {
        id: value.id,
        name: value.name,
        src: value.src
      } as PhotosDto;
    });
  }

  convertMainPhotoDaoToDto(photo: Photo): MainPhotoDto {
    return {
      id: photo?.id ?? '',
      name: photo?.name ?? '',
      src: photo?.src ?? ''
    };
  }
}
