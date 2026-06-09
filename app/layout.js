import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://kbfoldingsolutions.com"),
  title: {
    default: "KB Folding Services | Folder Machine Repair & Bindery Support",
    template: "%s",
  },
  description:
    "KB Folding Services provides folder machine repair, troubleshooting, training, preventive maintenance, parts support, and bindery equipment service for print shops, binderies, mail houses, and production teams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
