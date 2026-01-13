import Col from "react-bootstrap/Col";

export default function HomeInfoCol({
  title,
  md,
  mb,
  mbMd,
  children,
}: {
  title: string;
  md?: number;
  mb?: number;
  mbMd?: number;
  children: React.ReactNode;
}) {
  return (
    <Col md={md ?? 4} className={`mb-${mb ?? 4} mb-md-${mbMd ?? 0}`}>
      <h3 className="mb-2">{title}</h3>
      {children}
    </Col>
  );
}
