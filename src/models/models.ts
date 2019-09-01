export interface IFilterListState {
  category: string;
  minPrice: number;
  maxPrice: number;
  isFavorites: boolean;
}

interface IAddress {
  lat: number;
  lng: number;
}

export interface IInitialProduct {
  address: IAddress;
  category: string;
  title: string;
  price: number;
  pictures: string[];
  relationships: {
    seller: string;
  };
  id: string;
  body_type?: string;
  gearbox?: string;
  year?: string;
  laptop_type?: string;
  processor?: string;
  ram?: string;
  screen?: string;
  camera_type?: string;
  matrix_resolution?: number;
  video_resolution?: string;
  property_type?: string;
  rooms?: number;
  square?: number;
}

export interface IProduct extends IInitialProduct {
  isFavorite: boolean;
  sellerName: string;
  sellerRating: number;
}

export interface ISeller {
  category: string;
  isCompany: boolean;
  name: string;
  rating: number;
  id: string;
}
