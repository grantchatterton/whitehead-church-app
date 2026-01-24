"use client";

import Image from "next/image";

import Card from "react-bootstrap/Card";

import DefaultAvatar from "@/components/ui/DefaultAvatar";

export default function StaffMemberCard({
  name,
  roles,
  avatarUrl,
}: {
  name: string;
  roles: string[];
  avatarUrl?: string;
}) {
  const avatarWidth = 150;
  const avatarHeight = 150;

  return (
    <Card className="h-100 text-center glass">
      <Card.Body>
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={`${name} Avatar`}
            width={avatarWidth}
            height={avatarHeight}
            className="rounded-circle mb-2"
          />
        ) : (
          <DefaultAvatar width={avatarWidth} height={avatarHeight} />
        )}
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="text-muted">{roles.join(", ")}</Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
