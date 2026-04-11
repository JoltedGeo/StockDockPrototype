import "./globals.css";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "Satguru Store",
  description: "StockDock prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}