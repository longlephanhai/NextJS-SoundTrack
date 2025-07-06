
import WaveTrack from "@/components/track/wave.track";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { slug: string },
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const temp = params?.slug.split("/html") ?? [];
  const temp1 = (temp[0]?.split("-") ?? []) as string[];
  const id = temp1[temp1.length - 1];

  // fetch post information
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${id}`,
    method: "GET",
  })

  return {
    title: res?.data?.title,
    description: res?.data?.description,

    openGraph: {
      title: 'Hỏi Dân IT',
      description: 'Beyond Your Coding Skills',
      type: 'website',
      images: [`https://raw.githubusercontent.com/hoidanit/images
hosting/master/eric.png`],
    },
  }
}



interface IProps {
  params: { slug: string }
}
const DetailTrackPage = async (props: IProps) => {

  const { params } = props;

  const temp = params?.slug.split("/html") ?? [];
  const temp1 = (temp[0]?.split("-") ?? []) as string[];
  const id = temp1[temp1.length - 1];


  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${id}`,
    method: "GET",
    nextOption: {
      caches: 'no-store', // Disable caching for this request
    }
  })

  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: id,
      sort: "-createdAt",
    }
  })

  return (
    <Container>
      <WaveTrack
        track={res?.data ?? null}
        comments={res1?.data?.result}
      />
    </Container>
  )
}

export default DetailTrackPage;