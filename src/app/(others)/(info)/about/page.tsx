import type { Metadata } from "next";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import LinkButton from "@/components/shared/LinkButton";
import { getStaffMembers } from "@/lib/data";

import StaffMemberCard from "./_components/StaffMemberCard";
import InfoPage from "@/components/ui/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the history and staff of Whitehead Baptist Church. Discover our journey from humble beginnings to the present day in the Blue Ridge Mountains.",
};

export default async function Page() {
  const staffMembers = await getStaffMembers();

  return (
    <InfoPage title="About Us">
      <p>
        Nestled atop a quiet hill in the Blue Ridge Mountains of Alleghany
        County, North Carolina, Whitehead Baptist Church rests in a place where
        time seems to slow and hearts are invited to be still. Surrounded by
        God&apos;s creation and wrapped in peaceful serenity, the church offers
        a gentle invitation to all who pass by: come and rest. Many believe
        there was divine guidance in the choosing of this beautiful parcel of
        land—a place set apart for worship, fellowship, and faith.
      </p>
      <p className="mb-3">
        As we reflect on our journey from humble beginnings to the present day,
        we are reminded of God&apos;s unwavering faithfulness. Through trials
        and triumphs, our church community has stood strong, united by a shared
        vision and a deep love for God and one another. We invite you to explore
        our history, join us in worship, and become part of our ongoing story of
        faith and fellowship.
      </p>
      <LinkButton href="/about/timeline" className="mb-4">
        View History
      </LinkButton>
      <Row className="g-4">
        {staffMembers.map((staffMember) => (
          <Col md={6} key={staffMember._id}>
            <StaffMemberCard
              name={staffMember.name}
              roles={staffMember.roles}
              avatarUrl={staffMember.avatarUrl}
            />
          </Col>
        ))}
      </Row>
    </InfoPage>
  );
}
