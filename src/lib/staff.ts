import "server-only";

import type { StaffMember } from "@/models/StaffMember";

export async function getStaffMembers(): Promise<StaffMember[]> {
  return [
    {
      id: 1,
      name: "Gary West",
      roles: ["Sunday School Superintendent"],
    },
    {
      id: 2,
      name: "Donnie Howell",
      roles: ["Sunday School Superintendent", "Young Adult Teacher"],
    },
    {
      id: 3,
      name: "Melvin Crouse",
      roles: ["Church Clerk"],
    },
    {
      id: 4,
      name: "Bill Howell",
      roles: ["Church Clerk", "Intermediate Teacher"],
    },
    {
      id: 5,
      name: "Linda Edwards",
      roles: ["Church Treasurer"],
    },
    {
      id: 6,
      name: "Sharon Henson",
      roles: ["Church Treasurer"],
    },
    {
      id: 7,
      name: "Miranda Gavin",
      roles: ["Beginners Teacher"],
    },
    {
      id: 8,
      name: "Ellen Wright",
      roles: ["Beginners Teacher"],
    },
  ];
}
