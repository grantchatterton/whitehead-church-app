import { redirect } from "next/navigation";

import Table from "react-bootstrap/Table";

import { format as dateFormat } from "date-fns";

import InfoPage from "@/components/ui/InfoPage";
import LinkButton from "@/components/ui/LinkButton";
import { verifyUserAdmin } from "@/lib/auth-session";
import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";

export default async function Page() {
  if (!(await verifyUserAdmin())) {
    redirect("/login");
  }

  await dbConnect();
  const serviceTimes = await ServiceTimeModel.find().lean();

  return (
    <InfoPage title="Manage Service Times">
      <LinkButton href="/admin/service-times/create" className="mb-3">
        Create New Service Time
      </LinkButton>
      <div className="table-responsive">
        <Table striped bordered hover className="text-start">
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
          <tbody className="overflow-auto">
            {serviceTimes.length > 0 ? (
              serviceTimes.map((serviceTime) => (
                <tr key={serviceTime._id.toString()}>
                  <td>{serviceTime._id.toString()}</td>
                  <td>{serviceTime.name}</td>
                  <td>{serviceTime.days.join(", ")}</td>
                  <td>
                    {dateFormat(
                      new Date(`1970-01-01T${serviceTime.startTime}:00`),
                      "hh:mm a"
                    )}
                  </td>
                  <td>
                    {dateFormat(
                      new Date(`1970-01-01T${serviceTime.endTime}:00`),
                      "hh:mm a"
                    )}
                  </td>
                  <td>
                    <LinkButton
                      href={`/admin/service-times/edit/${serviceTime._id.toString()}`}
                      className="btn-sm me-2"
                    >
                      Edit
                    </LinkButton>
                    <LinkButton
                      href={`/admin/service-times/delete/${serviceTime._id.toString()}`}
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
      </div>
    </InfoPage>
  );
}
