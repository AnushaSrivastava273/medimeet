import VideoCall from "./video-call-ui";
import { checkUser } from "@/lib/checkUser";

export default async function VideoCallPage({ searchParams }) {
  const { sessionId, token } = await searchParams;
  const user = await checkUser();

  return <VideoCall sessionId={sessionId} token={token} userRole={user?.role} />;
}