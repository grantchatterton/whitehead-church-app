import AppNavbar from "@/components/shared/AppNavbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppNavbar title="Whitehead Baptist Church" />
      {children}
    </>
  );
}
