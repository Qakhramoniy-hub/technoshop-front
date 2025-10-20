// src/utils/localStorage.ts

// --- UMUMIY EVENT DISPATCH FUNKSIYASI ---
const dispatchStorageEvent = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("localStorageChange"));
  }
};

// --- WISHLIST MANTIQI ---
export interface LikedProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

const LIKES_KEY = "likedProducts";

export const getLikedProducts = (): LikedProduct[] => {
  if (typeof window === "undefined") return [];
  const storedLikes = localStorage.getItem(LIKES_KEY);
  try {
    return storedLikes ? JSON.parse(storedLikes) : [];
  } catch (e) {
    console.error("Liked productsni yuklashda xatolik:", e);
    return [];
  }
};

export const toggleLike = (product: LikedProduct): LikedProduct[] => {
  const currentLikes = getLikedProducts();
  const index = currentLikes.findIndex((item) => item.id === product.id);

  let newLikes;
  if (index > -1) {
    newLikes = currentLikes.filter((item) => item.id !== product.id);
  } else {
    newLikes = [...currentLikes, product];
  }

  localStorage.setItem(LIKES_KEY, JSON.stringify(newLikes));
  dispatchStorageEvent();
  return newLikes;
};

export const isLiked = (productId: number): boolean => {
  return getLikedProducts().some((item) => item.id === productId);
};

// --- SAVAT (CART) MANTIQI ---
export interface CartProduct {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

const CART_KEY = "cartProducts";

export const getCartProducts = (): CartProduct[] => {
  if (typeof window === "undefined") return [];
  const storedCart = localStorage.getItem(CART_KEY);
  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (e) {
    console.error("Cart productsni yuklashda xatolik:", e);
    return [];
  }
};

export const addToCart = (
  product: Omit<CartProduct, "quantity">,
  quantity: number = 1
): CartProduct[] => {
  const currentCart = getCartProducts();
  const existingItemIndex = currentCart.findIndex(
    (item) => item.id === product.id
  );

  let newCart: CartProduct[];

  if (existingItemIndex > -1) {
    newCart = currentCart.map((item, index) =>
      index === existingItemIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  } else {
    const newItem: CartProduct = { ...product, quantity };
    newCart = [...currentCart, newItem];
  }

  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  dispatchStorageEvent();
  return newCart;
};

export const updateCartQuantity = (
  productId: number,
  newQuantity: number
): CartProduct[] => {
  let currentCart = getCartProducts();
  let newCart: CartProduct[];

  if (newQuantity <= 0) {
    newCart = currentCart.filter((item) => item.id !== productId);
  } else {
    newCart = currentCart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
  }

  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  dispatchStorageEvent();
  return newCart;
};

export const removeFromCart = (productId: number): CartProduct[] => {
  const currentCart = getCartProducts();
  const newCart = currentCart.filter((item) => item.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(newCart));
  dispatchStorageEvent();
  return newCart;
};

// Added clearCart function
export const clearCart = (): CartProduct[] => {
  localStorage.setItem(CART_KEY, JSON.stringify([]));
  dispatchStorageEvent();
  return [];
};
