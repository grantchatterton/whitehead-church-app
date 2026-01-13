import { address } from "@/lib/config";

import HomeInfoCol from "./HomeInfoCol";

export default function HomeInfoLocationCol() {
  return (
    <HomeInfoCol title="Location" md={6}>
      <a
        className="mb-0"
        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
        target="_blank"
      >
        {address}
      </a>
    </HomeInfoCol>
  );
}
