'use client'
import { useDropzone, FileWithPath } from 'react-dropzone';
import './theme.css'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function InputFileUpload() {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      onClick={(event) => event.preventDefault()}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
      />
    </Button>
  );
}

interface IProps {
  setValue: (value: number) => void;
  setTrackUpload?: (trackUpload: { fileName: string; percent: number, uploadedTrackName: string }) => void;
  trackUpload?: {
    fileName: string;
    percent: number;
    uploadedTrackName: string;
  };
}

const Step1 = (props: IProps) => {
  const { trackUpload } = props;
  const { data: session } = useSession()
  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      props.setValue(1);
      const audio = acceptedFiles[0];
      const formData = new FormData();
      formData.append('fileUpload', audio);

      try {
        const res = await axios.post('http://localhost:8000/api/v1/files/upload', formData, {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'target_type': 'track',
          },
          onUploadProgress: progressEvent => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total!);
            props.setTrackUpload?.({
              ...trackUpload,
              fileName: acceptedFiles[0].name,
              percent: percentCompleted,
              uploadedTrackName: res.data.data.fileName
            });
            //  props.setTrackUpload?.((prevState:any) => ({
            //   ...prevState,
            //   uploadedTrackName: res.data.data.fileName
            // });
            // do whatever you like with the percentage complete
            // maybe dispatch an action that will update a progress bar or something
          }
        })
      } catch (error) {
        //@ts-ignore
        console.log('Error uploading file:', error?.response?.data.message);
      }

    }
  }, [session])

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'audio': ['.mp3'],
    }
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <InputFileUpload />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default Step1;