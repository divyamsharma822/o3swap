import React from 'react';
import { NavLink } from 'react-router-dom';
import { BriefcaseBusiness, Minus, Search, Settings } from 'lucide-react';
import LOGO from '@assets/navbar/logo.png';
import TWITTER_LOGO from '@assets/navbar/twitter.svg';
import DISCORD_LOGO from '@assets/navbar/discord.svg';
import { motion } from 'framer-motion';

const Navbar = ({}) => {
    return (
        <motion.div
            className="navbar fixed top-0 left-0 right-0 flex justify-around text-white p-4 py-4 border-2 border-t-0 border-slate-600 mx-[100px] rounded-b-xl bg-[#171717]/30 backdrop-blur-2xl"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="left flex justify-start items-center gap-10">
                <img
                    src={LOGO}
                    alt="logo"
                    className="object-contain h-5 mr-5"
                />
                {[
                    ['Swap', '/'],
                    ['Hub', '/hub'],
                ].map(([label, link]) => (
                    <NavLink
                        to={link}
                        key={link}
                        className={({ isActive }) =>
                            isActive
                                ? 'active-nav text-[#88be52] font-bold text-lg mx-4'
                                : 'nav font-bold text-lg mx-4'
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </div>
            <div className="right flex justify-end items-center gap-4 ">
                <div className="hidden 2xl:flex gap-10 justify-center">
                    <Settings
                        size={24}
                        className="hover:scale-105 cursor-pointer text-slate-300"
                    />
                    <BriefcaseBusiness
                        size={24}
                        className="hover:scale-105 cursor-pointer text-slate-300"
                    />
                </div>
                <Minus
                    className="hidden 2xl:flex rotate-90 text-slate-600"
                    strokeWidth={3}
                />
                <div className="hidden 2xl:flex gap-10 justify-center">
                    <img
                        src={DISCORD_LOGO}
                        className="h-6 object-contain hover:scale-105 cursor-pointer"
                    />
                    <img
                        src={TWITTER_LOGO}
                        className="h-6 object-contain hover:scale-105 cursor-pointer"
                    />
                </div>
                <Minus
                    className="hidden 2xl:flex rotate-90 text-slate-600"
                    strokeWidth={3}
                />
                <div className="flex gap-4 justify-center">
                    {/* <div className="search hidden lg:flex items-center gap-2 px-4 py-1 rounded-full bg-[#1c1e27]">
                        <Search className="text-slate-300" size={17} />
                        <input
                            type="text"
                            className="bg-transparent focus:outline-none focus:ring-0 w-[150px]"
                            placeholder="Search"
                        />
                    </div> */}
                    <button
                        type="button"
                        className="bg-[#2c59ae49] text-white font-bold rounded-full px-4 py-1 cursor-pointer active:scale-95 animate-pulse"
                    >
                        Connect Wallet
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
