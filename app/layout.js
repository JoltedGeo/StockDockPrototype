import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { RegionProvider } from "./context/RegionContext";

export const metadata = {
  title: "Satguru Store",
  description: "StockDock prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <RegionProvider>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </RegionProvider>
      </body>
    </html>
  );
}