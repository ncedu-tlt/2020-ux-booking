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
import { Amenities } from '../db/domain/ameniries.dao';
import { AmenitiesDto } from '@booking/models/amenities.dto';
import { AmenitiesRoom } from '../db/domain/amenities_room.dao';


@Injectable()
export class HotelsConversionService {

  convertAddressDaoToDto(address: Address): AddressDto {

    if (address === null) {
      return {
        country: '',
        city: '',
        street: '',
        part: '',
        number: Number()
      }
    } else {
      return {
        country: address.city.country.name,
        city: address.city.name,
        street: address.street,
        part: address.part,
        number: address.number
      }
    }
  }


  convertServiceDaoToDto(service: Service[]): ServicesDto[] {

    return service.map(value => {
      return {
        id: value.id,
        name: value.name,
        price: value.price,
        icon: value.icon,
        category: value.category.name
      } as ServicesDto
    })
  }


  convertServiceTypeDaoToDto(serviceType: ServiceType): ServiceTypeDto {

    if (serviceType === null) {
      return {
        id: '',
        name: ''
      }
    } else {
      return {
        id: serviceType.id,
        name: serviceType.name
      }
    }
  }


  convertPhotoDaoToDto(photos: Photo[]): PhotosDto[] {
    return photos.map(value => {
      return {
        id: value.id,
        name: value.name,
        src: value.src,
      } as PhotosDto
    })
  }

  convertMainPhotoDaoToDto(photo: Photo): MainPhotoDto {

    if (photo === null) {
      return {
        id: '',
        name: '',
        src: ''
      }
    } else {
      return {
        id: photo.id,
        name: photo.name,
        src: ''
      }

    }
  }

  /*convertAmenitiesDaoToDto(amenities: AmenitiesRoom[]): AmenitiesDto[] {
    return amenities.map(value => {
      return {
        id: value.id,
        name: value.name,
        default: value.default,
        icon: value.icon,
      } as AmenitiesDto
    })
  }*/

}


