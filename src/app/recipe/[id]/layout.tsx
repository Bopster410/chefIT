import { BackButton } from '@/features/backButton';

export default function RecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='relative h-full'>
            <div className='absolute top-4 right-4'>
                <BackButton
                    circle
                    color='white'
                >
                    X
                </BackButton>
            </div>
            {children}
        </div>
    );
}
