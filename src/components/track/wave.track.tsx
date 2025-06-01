'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { useWavesurfer } from "@/utils/customHook";
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

const WaveTrack = () => {
  const searchParams = useSearchParams()
  const fileName = searchParams.get('audio');
  const containerRef = useRef<HTMLDivElement>(null);

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
    return {
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      url: `/api?audio=${fileName}`,
      barWidth: 2
    }
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!wavesurfer) return
    setIsPlaying(false)

    const subscription = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false))
    ]
  }, [wavesurfer])

  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer])

  return (
    <div>
      <div ref={containerRef}>
        wave track
      </div>
      <button onClick={() => { onPlayClick() }}>
        {isPlaying ? " Pause" : " Play"}
      </button>
    </div>
  )
}

export default WaveTrack;