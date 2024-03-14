"use client";

import { MY_ORDER } from "@/app/apollo/client/query/getOrder.query";
import { useQuery } from "@apollo/client";
import React from "react";

export default function ViewOrder() {
  const { data } = useQuery(MY_ORDER);
  return <div>page</div>;
}
