import { BackButton } from '@/features/backButton';
import CloseIcon from '@mui/icons-material/Close';

export default function RecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='relative h-full'>
            <div className='absolute top-4 right-4 z-10'>
                <BackButton
                    circle
                    color='white'
                    className='shadow-2xl shadow-black'
                >
                    <CloseIcon />
                </BackButton>
            </div>
            {children}
        </div>
    );
}
