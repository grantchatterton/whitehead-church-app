import type { Metadata } from "next";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import "bootstrap/dist/css/bootstrap.min.css";

import AppFooter from "@/components/shared/AppFooter";
import AppNavbar from "@/components/shared/AppNavbar";
import BackgroundImage from "@/components/shared/BackgroundImage";

import "./globals.css";

const title = "Whitehead Baptist Church";
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
        <BackgroundImage />
        <Stack direction="vertical" className="min-vh-100 p-4">
          <AppNavbar title={title} />
          <Container as={"main"} className="mt-auto">
            {children}
          </Container>
          <AppFooter title={title} />
        </Stack>
      </body>
    </html>
  );
}
