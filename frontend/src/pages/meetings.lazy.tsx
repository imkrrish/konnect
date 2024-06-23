import { createLazyFileRoute } from "@tanstack/react-router";
import { FC } from "react";

export interface IMeetingsPageProps {}

const MeetingsPage: FC<IMeetingsPageProps> = ({}) => {
  return <div className="">meetings.lazy</div>;
};

export const Route = createLazyFileRoute("/meetings")({
  component: MeetingsPage,
});
