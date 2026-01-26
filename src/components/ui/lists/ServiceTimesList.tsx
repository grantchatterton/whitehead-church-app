import { getServiceTimes } from "@/lib/data";

export default async function ServiceTimesList() {
  const serviceTimes = await getServiceTimes({ formatTimes: true });

  return (
    <ul className="list-unstyled mb-0">
      {serviceTimes.map((service) => (
        <li key={service._id}>
          {service.name} ({service.days.join(", ")}): {service.startTime} -{" "}
          {service.endTime}
        </li>
      ))}
    </ul>
  );
}
