export default function ChefbookRecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className='relative h-full'>{children}</div>;
}
