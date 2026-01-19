import type { Metadata } from "next";

import HomeNavbar from "@/components/home/HomeNavbar";
import HomeInfo from "@/components/home/info/HomeInfo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Whitehead Baptist Church, located in the Blue Ridge Mountains of North Carolina. Join us for worship and fellowship.",
};

export default function Page() {
  return (
    <div className="text-center">
      <HomeNavbar />
      <hr className="mt-0" />
      <HomeInfo />
    </div>
  );
}
