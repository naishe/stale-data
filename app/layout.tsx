import Image from "next/image";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Back to the future?",
  description: "I mean back to the 90s!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen p-10 max-w-4xl mx-auto">
          <div className="flex justify-between mb-10">
            <Link href="/">
              <Image src="/logo.png" alt="T9d9" width={144} height={32} />
            </Link>
            <h3 className="text-xl font-bold text-orange-600 text-right">
              {metadata.title}
              <br />
              <span className="text-gray-500 text-sm">
                {metadata.description}
              </span>
            </h3>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
