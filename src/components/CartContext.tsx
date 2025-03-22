"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Movie } from "@/app/index/index";

interface CartContextType {
  cart: Movie[];
  cartCount: number;
  addToCart: (movie: Movie) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Movie[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedCount = localStorage.getItem("cartCount");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedCount) {
      setCartCount(parseInt(savedCount));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
    localStorage.setItem("cartCount", cartCount.toString());
  }, [cart, cartCount]);

  const addToCart = (movie: Movie) => {
    setCart((prevCart) => [...prevCart, movie]);
    setCartCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = (id: number) => {
    const index = cart.findIndex((movie) => movie.id === id);

    if (index !== -1) {
      setCart((prevCart) => [
        ...prevCart.slice(0, index),
        ...prevCart.slice(index + 1),
      ]);
      setCartCount((prevCount) => prevCount - 1);
    }
  };

  const clearCart = () => {
    setCart([]);
    setCartCount(0);
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
