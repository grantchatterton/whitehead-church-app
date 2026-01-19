import HomeInfoCol from "./HomeInfoCol";

const address = "5444 Pine Swamp Rd, Sparta, North Carolina, 28675";

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
