import Stack from "react-bootstrap/Stack";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack as="main">
      <div className="my-auto">{children}</div>
    </Stack>
  );
}
