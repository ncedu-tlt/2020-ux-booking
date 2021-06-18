import { HotelsRelations, RoomRelations } from './hotels.relations';

export const RELATIONS_GET_HOTEL_ID: string[] = [
  HotelsRelations.address,
  HotelsRelations.city,
  HotelsRelations.country,
  HotelsRelations.services,
  HotelsRelations.category,
  HotelsRelations.serviceType,
  HotelsRelations.currency,
  HotelsRelations.mainPhoto,
  HotelsRelations.photos,
  HotelsRelations.distance,
  HotelsRelations.hotelBoardBasis,
  HotelsRelations.boardBasis
];

export const RELATIONS_GET_HOTELS: string[] = [
  HotelsRelations.address,
  HotelsRelations.city,
  HotelsRelations.country
];

export const RELATIONS_GET_HOTEL_FOOD: string[] = [
  HotelsRelations.hotelBoardBasis,
  HotelsRelations.boardBasis
];

export const RELATIONS_GET_HOTEL_SERVICES: string[] = [
  HotelsRelations.services,
  HotelsRelations.category
];

export const RELATIONS_GET_HOTEL_PHOTOS: string[] = [
  HotelsRelations.currency,
  HotelsRelations.mainPhoto
];

export const RELATIONS_GET_ROOM: string[] = [
  RoomRelations.beds,
  RoomRelations.amenitiesRoom,
  RoomRelations.amenities,
  RoomRelations.photos
];

export const RELATIONS_GET_ROOMS_BEDS: string[] = [RoomRelations.beds];

export const RELATIONS_GET_ROOMS_PHOTOS: string[] = [RoomRelations.photos];
