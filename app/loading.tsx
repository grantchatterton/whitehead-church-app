import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";

import CrossImage from "@/components/shared/CrossImage";

export default function Loading() {
  return (
    <Stack
      direction="vertical"
      gap={3}
      className="justify-content-center align-items-center"
    >
      <CrossImage width={72} height={72} />
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p>Loading...</p>
    </Stack>
  );
}
