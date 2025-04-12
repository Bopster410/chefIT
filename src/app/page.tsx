import { HomePage } from '@/pagesss/home/ui';
import { CookingProgressBarContainer } from '@/widgets/cookingProgressBar/ui/index.container';

export const dynamic = 'force-dynamic'

export default function Page() {
    return (
        <>
            <HomePage />
            <CookingProgressBarContainer />
        </>
    );
}
