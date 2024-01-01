import "@/app/styles/base.css";
import "@/app/styles/components.css";
import "@/app/styles/section.css";
import "@/app/styles/responsive.css";
import "@/app/styles/utilities.css";
import "@/app/styles/admin.css";
import { Providers } from "../redux/Provider";
import { AppProvider } from "./_store/Provider";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";


export default function RootLayout({ children }) {
  return (
    <html lang="vn">
      <body>
        <Providers>
          <ChakraProvider theme={theme}>
            <AppProvider>{children}</AppProvider>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
