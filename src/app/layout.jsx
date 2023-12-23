import "@/app/styles/base.css";
import "@/app/styles/components.css";
import "@/app/styles/section.css";
import "@/app/styles/responsive.css";
import "@/app/styles/utilities.css";
import "@/app/styles/admin.css";
import { Providers } from "../redux/Provider";
import { AppProvider } from "./_store/Provider";
import { Nunito } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  disablePreload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="vn" className={nunito.className}>
      <body>
        <Providers>
          <ChakraProvider>
            <AppProvider>{children}</AppProvider>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
