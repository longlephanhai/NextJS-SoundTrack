'use client'

import useHasMounted from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const hasMounted = useHasMounted();

    if (!hasMounted) {
        return (<></>)
    }

    return (
        <AppBar
            position="fixed"
            color="primary"
            sx={{ top: 'auto', bottom: 0, backgroundColor: '#f2f2f2', padding: '10px 0' }}
        >
            <Container sx={{ display: 'flex', gap: 10 }}>
                <AudioPlayer
                    autoPlay
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/audio.mp3`}
                    volume={0.5}
                    style={{
                        boxShadow: 'unset',
                        background: '#f2f2f2'
                    }}
                />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    justifyContent: 'center',
                    minWidth: '100px'
                }}>
                    <div style={{ color: '#ccc' }}>Long Le</div>
                    <div style={{ color: 'black' }}>Hi</div>
                </div>
            </Container>
        </AppBar>
    )
}
export default AppFooter;