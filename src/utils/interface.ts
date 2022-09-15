export interface Trip {
  id?: String;
  name: String;
  initDate: String;
  cities?: String[];
  endDate: String;
  plannerId?: String;
  tripOnUser: Object[];
  description: String;
  activities: String[];
  image?: String;
  price?: Number;
}

export interface User {
  name: string;
  mail: string;
  avatar: string;
  description: string;
}

export interface UserUpdate {
  name: String;
  mail: String;
  description: String;
}

export interface Activity {
  id?: string;
  name: string;
  availability: string;
  description: string;
  price: number;
  active?: boolean;
}

export enum weekdays {
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
}

export interface City {
  cityId: String;
  name: String;
  country: String;
  altCountry: String;
  muni: String;
  muniSub: String;
  featureClass: String;
  featureCode: String;
  adminCode: String;
  population: Number;
  loc: {
    type: String;
    coordinates: Number[];
  };
}

export interface CityInDB {
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
}