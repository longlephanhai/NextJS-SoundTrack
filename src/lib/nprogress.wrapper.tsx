'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgressWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="2px"
        color="#CCC"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default NProgressWrapper;