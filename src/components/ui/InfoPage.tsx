export default function InfoPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="fs-2">{title}</h1>
      <hr className="my-3" />
      {children}
    </>
  );
}
