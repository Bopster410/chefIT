import type { Metadata } from 'next';
import { StepsProvider } from '@/app/providers/steps';
import { ModalContainer } from '@/shared/uikit/modal';
import { ModalStoreProvider } from '@/app/providers/modalProvider';
import { TimersProviderWrapper } from './providers/timers/index.wrapper';
import { SpeechRecognitionStoreProvider } from './providers/speechRecognitionProvider';
import { inter, manrope } from '@/shared/fonts';
import './globals.css';

const baseFont = inter;
const headerFont = manrope;

export const metadata: Metadata = {
    title: 'chefIT',
    description: 'Want a fancy meal? Just chef it!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${baseFont.variable} ${headerFont.variable} antialiased bg-background min-h-screen flex justify-center text`}
            >
                <div className='w-full min-h-screen mobile:w-(--breakpoint-mobile)'>
                    <ModalStoreProvider>
                        <TimersProviderWrapper>
                            <StepsProvider>
                                <SpeechRecognitionStoreProvider>
                                    {/* <SpeechListener /> */}
                                    {children}
                                </SpeechRecognitionStoreProvider>
                                <ModalContainer />
                            </StepsProvider>
                        </TimersProviderWrapper>
                    </ModalStoreProvider>
                </div>
            </body>
        </html>
    );
}
