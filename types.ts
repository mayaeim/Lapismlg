
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}
