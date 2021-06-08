export enum HotelRelations {
  address = 'address',
  city = 'address.city',
  country = 'address.city.country',
  services = 'services',
  category = 'services.category',
  serviceType = 'serviceType',
  currency = 'currency',
  mainPhoto = 'mainPhoto',
  photos = 'photos',
  distance = 'distance',
  hotelBoardBasis = 'hotelBoardBasis',
  boardBasis = 'hotelBoardBasis.boardBasis'
}

export enum RoomRelations {
  beds = 'beds',
  amenitiesRoom = 'amenitiesRoom',
  amenities = 'amenitiesRoom.amenities',
  photos = 'photos'
}
