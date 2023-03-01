"use client";

import "./globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { LanguageProvider } from "../hoc/languageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/styles/fonts.css" />
      </head>
      <body>
        <>
          <LanguageProvider>{children}</LanguageProvider>
        </>
      </body>
    </html>
  );
}
