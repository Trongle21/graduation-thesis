"use client";

import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import Navigation from "@/app/_components/Navigation";

const StoredProducts = () => {
  return (
    <Flex gap="20px">
      <Navigation />
      <h2>Hello</h2>
    </Flex>
  );
};

export default StoredProducts;
