"use client";

import { MY_ORDER } from "@/app/apollo/client/query/getOrder.query";
import { useQuery } from "@apollo/client";
import React from "react";

export default function ViewOrder() {
  const { data } = useQuery(MY_ORDER);
  return <div><div class="font-[sans-serif] bg-gray-50 p-6 min-h-screen">
  <div class="max-w-7xl mx-auto">
    <h2 class="text-3xl font-extrabold text-[#333] text-center">Checkout</h2>
    <div class="grid lg:grid-cols-3 gap-8 mt-12">
      <div class="lg:col-span-2">
        <h3 class="text-xl font-bold text-[#333]">Choose your payment method</h3>
        <div class="grid gap-4 sm:grid-cols-2 mt-6">
          <div class="flex items-center">
            <input type="radio" class="w-5 h-5 cursor-pointer" id="card" checked />
            <label for="card" class="ml-4 flex gap-2 cursor-pointer">
              <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
              <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
              <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
            </label>
          </div>
          <div class="flex items-center">
            <input type="radio" class="w-5 h-5 cursor-pointer" id="paypal" />
            <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
              <img src="https://readymadeui.com/images/paypal.webp" class="w-20" alt="paypalCard" />
            </label>
          </div>
        </div>
        <form class="mt-8">
          <div class="grid gap-6">
            <div class="grid sm:grid-cols-3 gap-6">
              <input type="number" placeholder="Card number"
                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
              <input type="number" placeholder="EXP."
                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
              <input type="number" placeholder="CVV"
                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
            </div>
            <div class="sm:col-span-2 grid sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Name of card holder"
                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
              <input type="number" placeholder="Postal code"
                class="px-4 py-3.5 bg-white text-[#333] w-full text-sm border rounded-md focus:border-[#007bff] outline-none" />
            </div>
          </div>
        </form>
      </div>
      <div class="lg:border-l lg:pl-8">
        <h3 class="text-xl font-bold text-[#333]">Summary</h3>
        <ul class="text-[#333] mt-6 space-y-4">
          <li class="flex flex-wrap gap-4 text-sm">Discount (20%) <span class="ml-auto font-bold">$4.00</span></li>
          <li class="flex flex-wrap gap-4 text-sm">Tax <span class="ml-auto font-bold">$4.00</span></li>
          <li class="flex flex-wrap gap-4 text-base font-bold border-t pt-4">Total <span class="ml-auto">$52.00</span></li>
        </ul>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 mt-10">
      <button type="button"
        class="px-6 py-3.5 text-sm bg-transparent border text-[#333] rounded-md hover:bg-gray-100">Pay later</button>
      <button type="button"
        class="px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Submit</button>
    </div>
  </div>
</div></div>;
}
