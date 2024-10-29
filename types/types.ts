export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  gender: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  phone: string;
  cell: string;
  nat: string;
}