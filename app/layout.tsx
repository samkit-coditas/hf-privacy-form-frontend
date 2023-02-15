"use client";

import './globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import { LanguageProvider } from "../hoc/languageProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </>
      </body>
    </html>
  )
}
