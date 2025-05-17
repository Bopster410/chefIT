import { BackButton } from '@/features/backButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function RecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='relative h-full'>
            <div className='flex items-center justify-between gap-4 py-4 pe-4 sticky top-0 bg-white'>
                <BackButton
                    color='white'
                    size='sm'
                >
                    <ArrowBackIcon />
                </BackButton>
            </div>
            {children}
        </div>
    );
}
