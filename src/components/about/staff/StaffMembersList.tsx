import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import dbConnect from "@/lib/mongodb";
import StaffMemberModel from "@/models/StaffMember";

import StaffMemberCard from "./StaffMemberCard";

export default async function StaffMembersList() {
  await dbConnect();
  const staffMembers = await StaffMemberModel.aggregate([
    {
      $addFields: {
        hasOrder: { $cond: [{ $ifNull: ["$order", false] }, 1, 0] },
      },
    },
    {
      $sort: {
        hasOrder: -1, // Staff members with 'order' field come first
        order: 1, // Then sort by 'order' ascending
        createdAt: 1, // Finally sort by 'createdAt' ascending
      },
    },
    { $project: { hasOrder: 0 } },
  ]).exec();

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
