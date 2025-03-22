import React from "react";

interface ModalProps {
  time: number;
  totalPrice: number;
  discountedTotal: number;
  onClose: () => void;
}

const Modal = ({ time, totalPrice, discountedTotal, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold">กรุณาทำการโอนเงิน</h3>
        <p className="mt-2">โปรดโอนเงินไปที่บัญชี 123-456-7890</p>

        <p className="font-semibold text-[14px]">
          ยอดรวม: ฿{totalPrice.toFixed(2)}
        </p>

        <p className="font-semibold text-[14px] text-blue-400">
          ส่วนลด: ฿{(totalPrice - discountedTotal).toFixed(2)}
        </p>

        <p className="font-semibold text-xl text-green-400">
          ยอดที่ต้องชำระ: ฿{discountedTotal.toFixed(2)}
        </p>

        <p className="mt-2 text-red-500">เวลาที่เหลือ: {time} วินาที</p>
        {time === 0 && <p className="text-[18px] text-red-500 mt-2">คุณไม่ได้ทำรายการในเวลาที่กำหนด</p>}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          ปิด
        </button>
      </div>
    </div>
  );
};

export default Modal;

