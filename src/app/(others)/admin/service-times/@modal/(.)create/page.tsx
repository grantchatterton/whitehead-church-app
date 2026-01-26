import ServiceTimeModal from "@/components/ui/modals/ServiceTimeModal";
import { createServiceTime } from "@/lib/actions";

export default function Page() {
  return (
    <ServiceTimeModal
      title="Create Service Time"
      submitAction={createServiceTime}
      submitLabel="Create"
    />
  );
}
