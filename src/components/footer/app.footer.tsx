'use client'

import { useTrackContext } from "@/lib/track.wrapper";
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import { useEffect, useRef } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const playerRef = useRef(null)
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  useEffect(() => {
    // @ts-ignore
    if (currentTrack.isPlaying) {
      // @ts-ignore
      playerRef?.current?.audio?.current?.play()
    } else {
      // @ts-ignore
      playerRef?.current?.audio?.current?.pause()
    }
  }, [currentTrack])

  if (!hasMounted) {
    return (<></>)
  }

  return (
    <>
      {currentTrack._id &&
        <div style={{ marginTop: '50px' }}>
          <AppBar
            position="fixed"
            color="primary"
            sx={{ top: 'auto', bottom: 0, backgroundColor: '#f2f2f2', padding: '10px 0' }}
          >
            <Container
              disableGutters
              sx={{
                display: 'flex',
                gap: 10, ".rhap_main": {
                  gap: '30px'
                }
              }}>
              <AudioPlayer
                layout="horizontal-reverse"
                autoPlay
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
                volume={0.5}
                style={{
                  boxShadow: 'unset',
                  background: '#f2f2f2'
                }}
                ref={playerRef}
                onPlay={() => {
                  setCurrentTrack({ ...currentTrack, isPlaying: true });
                }}
                onPause={() => {
                  setCurrentTrack({ ...currentTrack, isPlaying: false });
                }}
              />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                width: '220px'
              }}>
                <div title={currentTrack.description} style={{
                  width: '100%',
                  color: '#ccc',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{currentTrack.description}</div>
                <div title={currentTrack.title} style={{
                  width: '100%',
                  color: '#ccc',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{currentTrack.title}</div>
              </div>
            </Container>
          </AppBar>
        </div>
      }
    </>
  )
}
export default AppFooter;