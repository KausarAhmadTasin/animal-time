import localFont from "next/font/local";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const space_grotesk = Space_Grotesk({ weight: ["400"], subsets: ["latin"] });

export const metadata = {
  title: "Animal Time",
  description: "Learn about animals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.className}`}>{children}</body>
    </html>
  );
}
