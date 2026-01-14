import "server-only";

import type { TimelineEvent } from "@/models/TimelineEvent";

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  return [
    {
      id: 1,
      title: "The Beginning",
      date: "March 9, 1938",
      description:
        "The story of Whitehead Union Baptist Church began on March 9, 1938, when a small but faithful group came together with a shared vision. A presbytery was organized, the church was lovingly named, and a building committee was appointed. The land was graciously deeded to the church trustees by F. M. Joines and wife, and H. M. Joines and wife.",
    },
    {
      id: 2,
      title: "Founding Member of New Association",
      date: "April 1938",
      description:
        "In April of 1938, a convention was held at Cherry Lane Church to organize a new association, and Whitehead Union Baptist Church proudly became a founding part of that fellowship.",
    },
    {
      id: 3,
      title: "Hosting the First Church Association",
      date: "September 16-17, 1938",
      description:
        "Later that year, on September 16 and 17, Whitehead Union Baptist Church hosted its first church association—marking an important milestone in its growing ministry and service to the community.",
    },
    {
      id: 4,
      title: "Land Deeded to Church Trustees & First Pastoral Leadership",
      date: "1938",
      description:
        "The land was graciously deeded to the church trustees by F. M. Joines and wife, and H. M. Joines and wife. Early pastoral leadership was provided by G. W. Miles and R. J. Toliver, and Ernest Hoppers faithfully served as the church's first clerk.",
    },
    {
      id: 5,
      title: "Rebuilding After the Fire",
      date: "April 27, 1973",
      description:
        "On April 27, 1973, tragedy struck when the church building was destroyed by fire. Yet even in the face of loss, the faith of the congregation did not waver. United by determination, prayer, and trust in God, the members came together and rebuilt. In just three months and fourteen days, the doors of the church reopened, and worship services resumed—standing as a powerful testimony to resilience, faith, and God's sustaining grace.",
    },
    {
      id: 6,
      title: "Continued Ministry and Worship",
      date: "Present Day",
      description:
        "Today, Whitehead Union Baptist Church continues to be a place of worship, welcome, and spiritual renewal. We give all honor and praise to God for His provision, His faithfulness, and for allowing us to gather in this sacred place to worship Him together.",
    },
  ];
}
