export interface UserInterface {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
}
