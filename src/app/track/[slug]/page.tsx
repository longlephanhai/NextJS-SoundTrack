'use client'

import WaveTrack from "@/components/track/wave.track";
import { useSearchParams } from "next/navigation";

interface IProps {
  params: { slug: string }
}
const DetailTrackPage = (props: IProps) => {
  const { params } = props;

  const searchParams = useSearchParams();
  const search = searchParams.get('search')

  return (
    <>
      <WaveTrack />
    </>
  )
}

export default DetailTrackPage;