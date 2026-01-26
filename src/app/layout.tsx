import type { Metadata } from "next";
import Image from "next/image";

import Stack from "react-bootstrap/Stack";

import backgroundImage from "@public/images/background.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

import AppFooter from "@/components/ui/AppFooter";

import "./globals.css";

const title = process.env.NEXT_PUBLIC_APP_TITLE!;
const description = `Official website of the ${title}.`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className="position-relative min-vh-100">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="background-image"
          loading="eager"
        />
        <Stack direction="vertical" className="min-vh-100 p-4">
          <Stack>{children}</Stack>
          <AppFooter />
        </Stack>
      </body>
    </html>
  );
}
