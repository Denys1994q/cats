import "./globals.sass";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "../components/nav-menu/NavMenu";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cats App",
    description: "Next app for people who love cats",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const menuLinks = [
        {
            title: "Voting",
            img: "/images/voting.svg",
            hoverImg: "/images/voting-hover.svg",
            activeImg: "/images/voting-active.svg",
        },
        {
            title: "Breeds",
            img: "/images/breeds.webp",
            hoverImg: "/images/breeds-hover.webp",
            activeImg: "/images/breeds-active.webp",
        },
        {
            title: "Gallery",
            img: "/images/gallery.svg",
            hoverImg: "/images/gallery-hover.svg",
            activeImg: "/images/gallery-active.svg",
        },
    ];

    return (
        <html lang='en'>
            <body className={jost.className}>
                <div className='main-container'>
                    <div className='main-container__nav-panel nav-panel'>
                        <Link href='/' className='nav-panel__logo'>
                            <Image src='/images/logo.png' height={24} width={106} alt='logo' />
                        </Link>
                        <NavMenu links={menuLinks} heading='Lets start using The Cat API' />
                    </div>
                    <div className='main-container__content'>{children}</div>
                </div>
            </body>
        </html>
    );
}
