import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Satguru Store",
  description: "StockDock prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Header />
        {children}
      </body>
    </html>
  );
}