import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import {
    AlignJustify,
    ArrowUpDown,
    ChevronDown,
    OctagonAlert,
    Settings2,
    Undo2,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TokenSearchDialog from './TokenSearchDialog';
import ConnectWalletDialog from './ConnectWalletDialog';
import LOGO from '@assets/navbar/logo.png';
import { NavLink } from 'react-router-dom';

const Converter = ({}) => {
    const [openSetting, setOpenSetting] = useState(false);

    const initialValues = {
        from: {
            currencyIcon:
                'https://cdn.o3.network/token-profile/metis/0x721532bC0dA5ffaeB0a6A45fB24271E8098629A7/logo.png',
            currencySymbol: 'ETH',
            family: 'Ethereum',
            priceInDollar: '3108.98',
        },
        to: {
            currencyIcon: '',
            currencySymbol: 'SELECT',
            family: '',
            priceInDollar: '0',
        },
    };

    const handleSwap = (values, setFieldValue) => {
        const prev = values.to;
        setFieldValue('to', values.from);
        setFieldValue('from', prev);
    };

    const crytoTagStyle = values => {
        return cn('px-2 rounded-md', {
            'text-[#459ffb] bg-[#459ffb]/20': values.from.family === 'Ethereum',
            'text-[#82afbf] bg-[#82afbf]/20': values.from.family === 'Arbitrum',
            'text-[#f0b90b] bg-[#f0b90b]/20':
                values.from.family === 'BNB Chain',
            'text-[#7056bf] bg-[#7056bf]/20': values.from.family === 'Polygon',
            'text-[#50bfb6] bg-[#50bfb6]/20': values.from.family === 'Gnosis',
            'text-[#bf5050] bg-[#bf5050]/20':
                values.from.family === 'Avalanche',
            'text-[#bf3d3d] bg-[#bf3d3d]/20': values.from.family === 'Optimism',
            'text-[#21db98] bg-[#21db98]/20': values.from.family === 'Neo',
            'text-[#6fa7a7] bg-[#6fa7a7]/20': values.from.family === 'Cube',
            'text-[#11c9cd] bg-[#11c9cd]/20': values.from.family === 'Metis',
        });
    };

    return (
        <>
            <div className="converter h-full w-full flex flex-col items-center justify-center text-white">
                {!openSetting ? (
                    <div className="flex flex-col gap-5 w-screen h-screen md:max-w-[500px] md:border-2 md:border-[#2c59ae49] bg-[#1b1e27] p-10 rounded-none md:rounded-3xl md:mt-[200px] overflow-scroll md:overflow-visible">
                        <div className="flex md:hidden justify-between items-center bg-[#262b36] rounded-full p-4 mb-5">
                            <img
                                src={LOGO}
                                alt="logo"
                                className="object-contain h-8 bg-clip-text"
                            />
                            <AlignJustify />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-3xl">Swap</div>
                            <Settings2
                                className="bg-[#292c35] p-2 rounded-full cursor-pointer hover:bg-[#2c59ae49]"
                                size={35}
                                onClick={() => setOpenSetting(true)}
                            />
                        </div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={values => console.log(values)}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                setFieldValue,
                                values,
                            }) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col relative"
                                >
                                    <div className="bottom-selector flex flex-col gap-3 p-5 bg-slate-500/15 rounded-t-2xl border-t-4 border-[#1b1e27]">
                                        <div className="flex gap-3 text-slate-400">
                                            From
                                            {values.from.family && (
                                                <p
                                                    className={crytoTagStyle(
                                                        values
                                                    )}
                                                >
                                                    {values.from.family}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="grow flex items-center gap-3">
                                                {values.from.currencyIcon && (
                                                    <img
                                                        src={
                                                            values.from
                                                                .currencyIcon
                                                        }
                                                        alt={
                                                            values.from
                                                                .currencySymbol
                                                        }
                                                        className="object-contain h-10 rounded-full"
                                                    />
                                                )}
                                                <label className="text-[25px]">
                                                    {values.from.currencySymbol}
                                                </label>
                                                <TokenSearchDialog />
                                            </div>
                                            <input
                                                type="number"
                                                step="any"
                                                placeholder="0.0"
                                                className="grow w-full ml-10 bg-transparent text-right focus:ring-0 focus:outline-none text-[25px] disabled:text-slate-500"
                                                defaultValue={1}
                                            />
                                        </div>
                                        <div className="flex justify-between text-slate-600 font-medium text-lg">
                                            <div>Balance</div>
                                            <div>
                                                ≈＄
                                                {values.from.priceInDollar}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="absolute flex justify-center items-center top-[50%] mt-1 -translate-y-1/2 -translate-x-1/2 left-[50%] bg-[#1b1e27] border-4 border-[#88be52] aspect-square rounded-full w-12 hover:scale-110 cursor-pointer transition-transform"
                                        onClick={() =>
                                            handleSwap(values, setFieldValue)
                                        }
                                        disabled={
                                            values.to.currencySymbol ===
                                            'SELECT'
                                        }
                                    >
                                        <ArrowUpDown className="text-[#88be52] rotate-45" />
                                    </button>
                                    <div className="bottom-selector flex flex-col gap-3 p-5 bg-slate-500/15 rounded-b-2xl border-t-4 border-[#1b1e27]">
                                        <div className="flex gap-3 text-slate-400">
                                            To
                                            {values.to.family && (
                                                <p
                                                    className={crytoTagStyle(
                                                        values
                                                    )}
                                                >
                                                    {values.to.family}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                {values.to.currencyIcon && (
                                                    <img
                                                        src={
                                                            values.to
                                                                .currencyIcon
                                                        }
                                                        alt={
                                                            values.to
                                                                .currencySymbol
                                                        }
                                                        className="object-contain h-10 rounded-full"
                                                    />
                                                )}
                                                <label className="text-[25px]">
                                                    {values.to.currencySymbol}
                                                </label>
                                                <TokenSearchDialog />
                                            </div>
                                            <input
                                                type="number"
                                                disabled
                                                step="any"
                                                placeholder="0.0"
                                                className="grow w-full bg-transparent text-right focus:ring-0 focus:outline-none text-[25px] disabled:text-slate-500"
                                                defaultValue={0}
                                            />
                                        </div>
                                        <div className="flex justify-between text-slate-600 font-medium text-lg">
                                            <div>Balance</div>
                                            <div>
                                                ≈＄{values.to.priceInDollar}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                        <ConnectWalletDialog
                            buttonStyle={'bg-[#88be52] rounded-lg py-3'}
                        />
                    </div>
                ) : (
                    <motion.div
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        exit={{ x: 100 }}
                        key="modal2"
                        className="flex flex-col gap-5 w-full max-w-[500px] min-h-[500px] md:border-2 md:border-[#2c59ae49] bg-[#1b1e27] p-10 rounded-none md:rounded-3xl mt-[100px]"
                    >
                        <div className="flex justify-between items-center">
                            <div></div>
                            <div className="text-[25px]">Settings</div>
                            <Undo2
                                size={25}
                                onClick={() => setOpenSetting(false)}
                            />
                        </div>
                        <div className="border-b-2 border-slate-600"></div>
                        <div className="flex flex-col md:flex-row justify-start md:justify-between w-full md:items-center">
                            <div>Slippage tolerance</div>
                            <Tabs
                                defaultValue="account"
                                className="bg-transparent w-fit"
                            >
                                <TabsList className="bg-slate-500 text-slate-300">
                                    <TabsTrigger
                                        value="account"
                                        className="data-[state=active]:bg-[#aefa61] font-bold"
                                    >
                                        Auto: 1%
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="password"
                                        className="data-[state=active]:bg-[#aefa61]"
                                    >
                                        <input
                                            type={'text'}
                                            placeholder="Custom"
                                            className="focus:ring-0 focus:outline-none bg-transparent w-[50px]"
                                        />
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                        <div className="flex flex-col md:flex-row justify-start md:justify-between w-full md:items-center">
                            <div>Transaction time limit</div>
                            <Tabs
                                defaultValue="account"
                                className="bg-transparent w-fit"
                            >
                                <TabsList className="bg-slate-500 text-slate-300">
                                    <TabsTrigger
                                        value="account"
                                        className="data-[state=active]:bg-[#aefa61] font-bold"
                                    >
                                        Auto: 10min
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="password"
                                        className="data-[state=active]:bg-[#aefa61]"
                                    >
                                        <input
                                            type={'text'}
                                            placeholder="Custom"
                                            className="focus:ring-0 focus:outline-none bg-transparent w-[60px]"
                                        />
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </motion.div>
                )}

                <div className="hidden md:grid grid-flow-col gap-4 text-slate-400 max-w-[500px] p-5 border border-slate-600 rounded-lg mt-5">
                    <OctagonAlert className="text-yellow-500" />
                    Cross-chain services on Gnosis, Cube, Bitgert, Celo, KCC,
                    Fantom, Astar, and Neo have been discontinued. Click to view
                    the announcement and follow the guide to withdraw assets!
                </div>
            </div>
        </>
    );
};

export default Converter;
