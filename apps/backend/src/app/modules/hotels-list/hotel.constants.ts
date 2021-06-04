import { HotelRelations, RoomRelations } from './hotel.relations';

export const RELATIONS_GET_HOTEL_ID: string[] = [
  HotelRelations.address,
  HotelRelations.city,
  HotelRelations.country,
  HotelRelations.services,
  HotelRelations.category,
  HotelRelations.serviceType,
  HotelRelations.currency,
  HotelRelations.mainPhoto,
  HotelRelations.photos,
  HotelRelations.distance,
  HotelRelations.hotelBoardBasis,
  HotelRelations.boardBasis
];

export const RELATIONS_GET_HOTELS: string[] = [
  HotelRelations.address,
  HotelRelations.city,
  HotelRelations.country
]

export const RELATIONS_GET_HOTEL_FOOD: string[] = [
  HotelRelations.hotelBoardBasis,
  HotelRelations.boardBasis
];

export const RELATIONS_GET_HOTEL_SERVICES: string[] = [
  HotelRelations.services,
  HotelRelations.category
];

export const RELATIONS_GET_HOTEL_PHOTOS: string[] = [
  HotelRelations.currency,
  HotelRelations.mainPhoto
];

export const RELATIONS_GET_ROOM: string[] = [
  RoomRelations.beds,
  RoomRelations.amenitiesRoom,
  RoomRelations.amenities,
  RoomRelations.photos
]

export const RELATIONS_GET_ROOMS_BEDS: string[] = [
  RoomRelations.beds
]

export const RELATIONS_GET_ROOMS_PHOTOS: string[] = [
  RoomRelations.photos
]
