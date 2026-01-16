import Row from "react-bootstrap/Row";

import HomeInfoLocationCol from "./HomeInfoLocationCol";
import HomeInfoServiceTimesCol from "./HomeInfoServiceTimesCol";

export default function HomeInfo() {
  return (
    <Row className="mx-auto">
      <HomeInfoLocationCol />
      <HomeInfoServiceTimesCol />
    </Row>
  );
}
