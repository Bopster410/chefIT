export default function RecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className='relative h-full'>{children}</div>;
}
