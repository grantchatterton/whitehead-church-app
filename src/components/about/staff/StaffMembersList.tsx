import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { getStaffMembers } from "@/lib/data";

import StaffMemberCard from "./StaffMemberCard";

export default async function StaffMembersList() {
  const staffMembers = await getStaffMembers();

  return (
    <Row className="g-4">
      {staffMembers.map((staffMember) => (
        <Col md={6} key={staffMember._id.toString()}>
          <StaffMemberCard
            name={staffMember.name}
            roles={staffMember.roles}
            avatarUrl={staffMember.avatarUrl}
          />
        </Col>
      ))}
    </Row>
  );
}
