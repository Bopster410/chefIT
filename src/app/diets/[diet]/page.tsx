import { SelectedFilterPageContainer } from "@/pagesss/selectedFilter";

export default async function Page({
    params,
}: {
    params: Promise<{ diet: string }>;
}) {
    const diet = (await params).diet;
    return (
        <SelectedFilterPageContainer type="diet" selectedFilter="diet"/>
    );
}
