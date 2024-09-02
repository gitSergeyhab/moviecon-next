import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto p-4 flex">
      <div
        className="bg-background-opacity flex flex-col items-center m-auto p-6 min-w-full sm:min-w-[400px] 
         rounded-md shadow-[0_35px_80px_15px_rgba(0,0,0,0.9)]"
      >
        {children}
      </div>
    </div>
  );
}
