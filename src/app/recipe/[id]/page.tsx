import { RecipePage } from '@/pagesss/recipe';

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    return <RecipePage id={id} />;
}
