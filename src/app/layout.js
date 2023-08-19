import "./globals.css";

export const metadata = {
  title: "Kakoliris training",
  description: "Copyright Stelios Kakoliris",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
