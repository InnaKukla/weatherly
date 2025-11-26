import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="flex flex-col  sm:flex-row gap-5 border-t border-solid border-[#0000003b] justify-between items-center  sm:mt-auto pt-10">
            <div className="flex flex-col  md:flex-row justify-between items-center md:items-baseline gap-4">
                <Link href="/">
                    <h1 className="mt-18 sm:mt-0 text-3xl font-bold bg-linear-to-r from-black to-[#ffffff60] bg-clip-text text-transparent">
                        Weather
                    </h1>
                </Link>
                <p className="text-[14px] text-[#000000a8]">© 2025</p>
            </div>
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="text-[14px] cursor-pointer text-[#000000a8] hover:text-[16px] hover:text-[#a8a2a2]"
                >
                    Політика конфіденційності
                </Link>
                <Link
                    href="/"
                    className="text-[14px] cursor-pointer text-[#000000a8] hover:text-[16px] hover:text-[#a8a2a2]"
                >
                    Угода користувача
                </Link>
                <Link
                    href="/"
                    className="text-[14px] cursor-pointer text-[#000000a8] hover:text-[16px] hover:text-[#a8a2a2]"
                >
                    Контакти
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
