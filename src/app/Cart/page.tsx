"use client";
import { useCart } from "../../components/CartContext"; 
import CartCom from "../../components/CartCom";
import Nav from "@/components/Nav";
import Foot from "@/components/Foot";
import { useEffect } from "react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart(); 

  useEffect(() => {
    if (cart.length === 0) {
      window.location.href = '/'; 
    }
  }, [cart]); 

  return (
    <>
      <div className="flex flex-col bg-blue-900 lg:min-h-screen">
        <div>
          <Nav />
        </div>
        <div className="h-full">
          <div className="lg:p-6 bg-blue-900">
            <CartCom
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Foot />
      </div>
    </>
  );
};

export default CartPage;
