import { redirect } from "next/navigation";

import Table from "react-bootstrap/Table";

import InfoPage from "@/components/ui/InfoPage";
import LinkButton from "@/components/ui/LinkButton";
import AddStarterServiceTimesButton from "@/components/ui/buttons/AddStarterServiceTimesButton";
import { verifyUserAdmin } from "@/lib/auth-session";
import { getServiceTimes } from "@/lib/data";

export default async function Page() {
  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  const serviceTimes = await getServiceTimes({ formatTimes: true });

  return (
    <InfoPage title="Manage Service Times">
      <div className="mb-3">
        <LinkButton href="/admin/service-times/create" className="me-2">
          Create New Service Time
        </LinkButton>
        <AddStarterServiceTimesButton />
      </div>

      <Table striped bordered hover responsive className="text-start">
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Days</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceTimes.length > 0 ? (
            serviceTimes.map((serviceTime) => (
              <tr key={serviceTime._id}>
                <td>{serviceTime._id}</td>
                <td>{serviceTime.name}</td>
                <td>{serviceTime.days.join(", ")}</td>
                <td>{serviceTime.startTime}</td>
                <td>{serviceTime.endTime}</td>
                <td>
                  <LinkButton
                    href={`/admin/service-times/edit/${serviceTime._id}`}
                    className="btn-sm me-2"
                  >
                    Edit
                  </LinkButton>
                  <LinkButton
                    href={`/admin/service-times/delete/${serviceTime._id}`}
                    className="btn-sm btn-danger"
                  >
                    Delete
                  </LinkButton>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No service times found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </InfoPage>
  );
}
