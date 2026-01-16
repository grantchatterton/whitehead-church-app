import HomeNavbar from "@/components/home/HomeNavbar";
import HomeInfo from "@/components/home/info/HomeInfo";

export default function Page() {
  return (
    <div className="text-center">
      <HomeNavbar />
      <hr className="mt-0" />
      <HomeInfo />
    </div>
  );
}
