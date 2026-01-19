import type { Metadata } from "next";

import HomeNavbar from "@/components/home/HomeNavbar";
import HomeInfo from "@/components/home/info/HomeInfo";
import { title as siteTitle } from "@/lib/config";

export const metadata: Metadata = {
  title: `Home | ${siteTitle}`,
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
