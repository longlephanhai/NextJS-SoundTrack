'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get('search')
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = containerRef.current
    if (element) {
      const wavesurfer = WaveSurfer.create({
        container: element,
        waveColor: 'rgb(200, 0, 200)',
        progressColor: 'rgb(100, 0, 100)',
        url: `/api?${fileName}`,
      })
    }
  }, [])
  return (
    <div ref={containerRef}>wave track</div>
  )
}

export default WaveTrack;