import { getServiceTimes } from "@/lib/data";

import HomeInfoCol from "./HomeInfoCol";

export default async function HomeInfoServiceTimesCol() {
  const serviceTimes = await getServiceTimes();

  return (
    <HomeInfoCol title="Service Times" md={6}>
      <ul className="list-unstyled mb-0">
        {serviceTimes.map((service) => (
          <li key={service._id}>
            {service.name} ({service.days.join(", ")}): {service.startTime} -{" "}
            {service.endTime}
          </li>
        ))}
      </ul>
    </HomeInfoCol>
  );
}
