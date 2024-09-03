import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import Header from "@/shared/components/Header/Header";
import Footer from "@/shared/components/Footer/Footer";
import { Provider } from "@/shared/components/Provider";
import "./globals.css";

const font = Playfair_Display({
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "MOVIECON",
  description: "Игра для любителей кино. Соревнуйся и стань лучшим!",
  keywords:
    "угадай фильм, угадай актера, угадай кадр, кино игра, викторина по фильмам, игра для киноманов, киновикторина, игры о фильмах, актеры викторина, кино угадайка",
  openGraph: {
    title: "MOVIECON",
    type: "website",
    description: "Игра для любителей кино. Соревнуйся и стань лучшим!",
    url: "https://movie-con.ru", // TODO: replace with real url
    images: [
      {
        url: "https://s.iimg.su/s/11/MCF35cUXtNWC7VY5WVyJcojfJBSCIWYi8QJrE8ir.jpg",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <div
          className={
            "bg-neutral-400 bg-[url('/img/sd/big1.webp')] bg-no-repeat bg-cover  overflow-y-auto min-w-80 h-dvh hide-scrollbar"
          }
        >
          <Provider>
            <Header />
            <main className="mt-12 md:mt-24">{children}</main>
            <Footer />
          </Provider>
        </div>
      </body>
    </html>
  );
}
