import { CollectionPage } from '@/pagesss/collection/ui/index.component';

export const dynamic = 'force-dynamic';

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const id = parseInt((await params).id);
    return <CollectionPage id={id} />;
}
