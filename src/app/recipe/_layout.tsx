export default function RecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='absolute h-screen top-0 left-0 right-0 bg-black/20 md:grid md:justify-center'>
            <div className='mt-4 h-full bg-white w-full md:w-3xl '>
                {children}
            </div>
        </div>
    );
}
