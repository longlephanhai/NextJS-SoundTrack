import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function HomePage() {
  // get session
  const session = await getServerSession(authOptions)

  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'POST',
    body: {
      category: "CHILL",
      limit: 10
    }
  })

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'POST',
    body: {
      category: "WORKOUT",
      limit: 10
    }
  })

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: 'http://localhost:8000/api/v1/tracks/top',
    method: 'POST',
    body: {
      category: "PARTY",
      limit: 10
    }
  })

  return (
    <Container>
      <MainSlider
        title="Top Chill"
        data={chills?.data ?? []}
      />
      <MainSlider
        title="Top Workout"
        data={workouts?.data ?? []}
      />
      <MainSlider
        title="Top Party"
        data={party?.data ?? []}
      />
    </Container>
  );
}
