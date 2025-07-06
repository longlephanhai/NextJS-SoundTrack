'use client'
import { fetchDefaultImages, sendRequest } from "@/utils/api";
import { useHasMounted } from "@/utils/customHook";
import { Box, TextField } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import WaveSurfer from "wavesurfer.js";
dayjs.extend(relativeTime)
interface IProps {
  track: ITrackTop | null;
  comments?: ITrackComment[];
  wavesurfer?: WaveSurfer | null;
}
const CommentTrack = async (props: IProps) => {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const { track, comments, wavesurfer } = props;
  const { data: session } = useSession()

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.round(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
  }

  const [yourComment, setYourComment] = useState<string>('');
  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<ITrackComment>>({
      url: `http://localhost:8000/api/v1/comments`,
      method: 'POST',
      body: {
        Content: yourComment,
        moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
        trackId: track?._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`
      }
    })
    if (res.data) {
      setYourComment('');
      router.refresh();
    }
  }

  const handleJumpTrack = (moment: number) => {
    if (wavesurfer) {
      const duration = wavesurfer.getDuration();
      wavesurfer.seekTo(moment / duration);
      wavesurfer.play();
    }
  }
  return (
    <div>
      <div style={{ marginTop: '50px', marginBottom: '25px' }}>
        {
          session?.user &&
          <TextField
            value={yourComment}
            onChange={(e) => setYourComment(e.target.value)}
            fullWidth label="Comments" variant="standard"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit()
              }
            }}
          />
        }
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div className="left" style={{ width: '190px' }}>
          <Image
            src={fetchDefaultImages(track?.uploader?.type!)}
            alt="avatar"
            height={150}
            width={150}
          />
        </div>
        <div className="right" style={{ width: "calc(100% - 200px)", padding: "200px" }}>
          {
            comments?.map((comment, index) => {
              return (
                <Box key={comment._id} sx={{ display: 'flex', gap: '10px', justifyContent: '' }}>
                  <Box sx={{ display: 'flex', gap: '10px', marginBottom: '25px', alignItems: 'center' }}>
                    <Image
                      src={fetchDefaultImages(comment?.user?.type)}
                      alt="comment"
                      height={40}
                      width={40}
                    />
                    <div>
                      <div style={{ fontSize: '13px' }}>{comment?.user?.name} at {formatTime(comment.moment)}
                        <span style={{ cursor: 'pointer' }} onClick={() => handleJumpTrack(comment.moment)}>
                          &nbsp; {formatTime(comment.moment)}
                        </span>
                      </div>
                      <div>
                        {comment.content}
                      </div>
                    </div>
                  </Box>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {hasMounted && dayjs(comment.createdAt).fromNow()}
                  </div>
                </Box>
              )
            })
          }
        </div>
      </div>
    </div>

  )
}

export default CommentTrack;