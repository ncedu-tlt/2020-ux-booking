import { MainPhotoDto } from '@booking/models/mainPhoto.dto';

export interface PhotosDto {
  mainPhoto?: MainPhotoDto,

  photos?: {
    id?: string,
    name?: string,
    src?: string
  }[]
}
