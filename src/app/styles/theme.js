"use client";
import { extendTheme } from "@chakra-ui/react";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  disablePreload: true,
});

const theme = extendTheme({
  fonts: {
    body: nunito.fontFamily,
    heading: nunito.fontFamily,
  },
});

export default theme;
