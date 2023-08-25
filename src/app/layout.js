import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Kakoliris training",
  description: "Copyright Stelios Kakoliris",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          type="text/javascript"
          src="https://unpkg.com/drag-drop-tool@1.0.2/src/index.js"
        />
      </body>
    </html>
  );
}
