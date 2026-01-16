import { getServiceTimes } from "@/lib/home";

import HomeInfoCol from "./HomeInfoCol";

export default async function HomeInfoServiceTimesCol() {
  const serviceTimes = await getServiceTimes();

  return (
    <HomeInfoCol title="Service Times" md={6}>
      <ul className="list-unstyled mb-0">
        {serviceTimes.map((service) => (
          <li key={service.id}>
            {service.name}: {service.startTime} - {service.endTime}
          </li>
        ))}
      </ul>
    </HomeInfoCol>
  );
}
