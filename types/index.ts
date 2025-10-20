export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  stock: number;
  colorOptions: string[];
  storageOptions: string[];
  Icon: string;
  href: string;
};

export type CartItem = Product & {
  quantity: number;
};
