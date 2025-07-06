import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { TrackContextProvider } from '@/lib/track.wrapper';
import { ToastProvider } from '@/utils/toast';
import Image from 'next/image'
import img from '../../public/flowers.jpg'
import NProgressWrapper from '@/lib/nprogress.wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* <Image
          src={img}
          alt='image'
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        /> */}
        <ThemeRegistry>
          <NProgressWrapper>
            <NextAuthWrapper >
              <ToastProvider>
                <TrackContextProvider>
                  {children}
                </TrackContextProvider>
              </ToastProvider>
            </NextAuthWrapper>
          </NProgressWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
