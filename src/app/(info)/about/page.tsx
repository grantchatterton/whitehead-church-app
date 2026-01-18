import StaffMembersList from "@/components/about/staff/StaffMembersList";
import TimelineContainer from "@/components/about/timeline/TimelineContainer";

export default function Page() {
  return (
    <>
      <h1>About Us</h1>
      <hr className="my-3" />
      <p>
        Nestled atop a quiet hill in the Blue Ridge Mountains of Alleghany
        County, North Carolina, Whitehead Baptist Church rests in a place
        where time seems to slow and hearts are invited to be still. Surrounded
        by God&apos;s creation and wrapped in peaceful serenity, the church
        offers a gentle invitation to all who pass by: come and rest. Many
        believe there was divine guidance in the choosing of this beautiful
        parcel of land—a place set apart for worship, fellowship, and faith.
      </p>
      <p className="mb-3">
        As we reflect on our journey from humble beginnings to the present day,
        we are reminded of God&apos;s unwavering faithfulness. Through trials
        and triumphs, our church community has stood strong, united by a shared
        vision and a deep love for God and one another. We invite you to explore
        our history, join us in worship, and become part of our ongoing story of
        faith and fellowship.
      </p>
      <TimelineContainer />
      <StaffMembersList />
    </>
  );
}
