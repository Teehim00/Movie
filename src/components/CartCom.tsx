"use client";

import React, { useState, useEffect } from "react";
import { Movie } from "../app/index/index";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface CartProps {
  cart: Movie[];
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

const CartCom = ({ cart, removeFromCart, clearCart }: CartProps) => {
  const [popup, setPopup] = useState(false);
  const [time, setTime] = useState(60);
  const [timerFinished, setTimerFinished] = useState(false);

  const router = useRouter();

  const startCountdown = () => {
    setPopup(true);
    setTime(60);
    setTimerFinished(false); 
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (timerFinished) {
      router.push("/Cart");
    }
  }, [timerFinished, router]);

  const totalPrice = cart.reduce(
    (total, movie) => total + (movie.price || 0),
    0
  );

  const calculateDiscountedPrice = (totalPrice: number) => {
    if (cart.length > 5) {
      return totalPrice * 0.8;
    } else if (cart.length > 3) {
      return totalPrice * 0.9;
    }
    return totalPrice;
  };

  const discountedTotal = calculateDiscountedPrice(totalPrice);


  return (
    <div className=" flex flex-col items-center justify-center lg:flex lg:flex-col lg:items-end lg:justify-center  lg:mt-4 lg:mb-4 bg-gray-600 rounded-lg pt-5">
      {Array.isArray(cart) && cart.length > 0 ? (
        <div className="flex flex-col gap-3 px-2 w-full ">
          <div className="flex items-center justify-center">
            <h1 className="text-white font-bold text-2xl">ORDER</h1>
          </div>
          {cart.map((movie, index) =>
            movie && movie.id ? (
              <div
                key={`${movie.id}-${index}`}
                className="flex flex-row items-center gap-2"
              >
                <div className="flex items-center justify-between lg:flex w-full bg-amber-100 pt-3 pl-2 pb-3 rounded-lg lg:items-center lg:justify-between lg:gap-10 gap-5">
                  <div className="lg:ml-4 w-[70px] h-[80px] lg:w-[150px] lg:h-full flex items-center justify-center bg-gray-200 rounded-lg overflow-hidden">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className=" text-gray-500 text-xs">No Image</span>
                    )}
                  </div>
                  <div className="lg:flex lg:w-[200px] w-[50px]">
                    <h3 className="lg:text-xl font-semibold">
                      <label className="text-[12px] block text-gray-600 lg:text-[14px]">
                        Title
                      </label>
                      <span className="text-[10px] text-black lg:text-[18px] block lg:w-[300px] w-full lg:break-words">
                        {movie.title}
                      </span>
                    </h3>
                  </div>
                  <div className="hidden lg:flex lg:w-[50px]">
                    <h3 className="text-xl font-semibold">
                      <label className="text-[12px] block text-gray-600 lg:text-[14px]">
                        Popularity
                      </label>
                      <span className="text-black text-[18px]">
                        {movie.popularity}
                      </span>
                    </h3>
                  </div>
                  <div className="hidden lg:flex lg:w-[50px]">
                    <h3 className="text-xl font-semibold">
                      <label className="block text-gray-600 text-[14px]">
                        Average
                      </label>
                      <span className="text-black text-[18px]">
                        {movie.vote_average}
                      </span>
                    </h3>
                  </div>
                  <div className="hidden lg:flex lg:w-[50px]">
                    <h3 className="text-xl font-semibold">
                      <label className="block text-gray-600 text-[14px]">
                        Vote
                      </label>
                      <span className="text-black text-[18px]">
                        {movie.vote_count}
                      </span>
                    </h3>
                  </div>
                  <div className="hidden lg:flex lg:w-[150px]">
                    <h3 className="text-xl font-semibold">
                      <label className="block text-gray-600 text-[14px]">
                        Date
                      </label>
                      <span className="text-black text-[18px]">
                        {movie.release_date}
                      </span>
                    </h3>
                  </div>

                  <div className="lg:flex lg:w-[50px] w-[60px]">
                    <h3 className="text-xl font-semibold">
                      <label className="text-[12px] block text-gray-600 lg:text-[14px]">
                        Price
                      </label>
                      <span className="text-[10px] text-black lg:text-[18px] block truncate lg:w-[300px] w-full">
                        {movie.price !== undefined ? movie.price : "-"}
                      </span>
                    </h3>
                  </div>
                  <div className="lg:flex lg:justify-end lg:w-[60px] lg:mr-4 w-[60px]">
                    <button
                      onClick={() => removeFromCart(movie.id)}
                      className="bg-red-500 text-white px-2 py-1 text-xs rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      ) : null}

      <div className="flex  items-center gap-3 lg:pr-3">
        {cart.length > 0 && (
          <div className="mt-4">
            <button
              onClick={clearCart}
              className=" bg-red-500 text-white p-2 w-[100px] rounded-lg "
            >
              Delete All
            </button>
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-4">
            <button
              onClick={startCountdown}
              className=" bg-green-500 text-white p-2 w-[100px] rounded-lg"
            >
              Buy
            </button>
          </div>
        )}
      </div>

      <div className="lg:text-right lg:pr-3 lg:pb-2 ">
        {cart.length > 0 && (
          <div className="mt-4">
            <p className="lg:hidden font-semibold text-xl text-red-400">
              ยอดรวม: ฿{totalPrice.toFixed(2)}
            </p>
            <p className="lg:hidden font-semibold text-xl text-green-400">
              ราคาหลังหักส่วนลด: ฿{discountedTotal.toFixed(2)}
            </p>
            <p className="hidden lg:block font-semibold text-xl text-red-400">
              {totalPrice.toFixed(2)}฿:ยอดรวม
            </p>
            <p className="hidden lg:block font-semibold text-xl text-green-400">
              {discountedTotal.toFixed(2)}฿:ราคาหลังหักส่วนลด
            </p>
          </div>
        )}
      </div>

      {popup && (
        <Modal
          time={time}
          totalPrice={totalPrice}
          discountedTotal={discountedTotal}
          onClose={() => setPopup(false)}
        />
      )}
    </div>
  );
};

export default CartCom;
