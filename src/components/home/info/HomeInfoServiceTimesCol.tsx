import dbConnect from "@/lib/mongodb";
import ServiceTimeModel from "@/models/ServiceTime";

import HomeInfoCol from "./HomeInfoCol";

export default async function HomeInfoServiceTimesCol() {
  await dbConnect();
  const serviceTimes = await ServiceTimeModel.find()
    .sort({ startTime: 1 })
    .lean();

  return (
    <HomeInfoCol title="Service Times" md={6}>
      <ul className="list-unstyled mb-0">
        {serviceTimes.map((service) => (
          <li key={service._id.toString()}>
            {service.name} ({service.days.join(", ")}): {service.startTime} -{" "}
            {service.endTime}
          </li>
        ))}
      </ul>
    </HomeInfoCol>
  );
}
