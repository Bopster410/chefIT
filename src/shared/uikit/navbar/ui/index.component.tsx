import Link from 'next/link';

export const Navbar = () => {
    return (
        <nav className='h-navbar-height flex justify-center items-center bg-white mb-2'>
            <Link
                className='font-bold text-[40px]'
                href={'/'}
            >
                chefIT
            </Link>
        </nav>
    );
};
