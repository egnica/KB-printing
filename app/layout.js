import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://kennysfolderservices.com"),
  title: {
    default:
      "Kenny's Folder Services | Folder Machine Repair & Bindery Support",
    template: "%s",
  },
  description:
    "Kenny's Folder Services provides folder machine repair, troubleshooting, training, preventive maintenance, parts support, and bindery equipment service for print shops, binderies, mail houses, and production teams.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics Tracking Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-566EHW96DY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-566EHW96DY');
          `}
        </Script>
        {children}
        <Footer />
      </body>
    </html>
  );
}
