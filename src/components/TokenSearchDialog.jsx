import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useWindowSize } from '@/lib/hooks';
import { ScrollArea } from './ui/scroll-area';
import { ChevronDown, Plus } from 'lucide-react';
import ARBITRUM_LOGO from '../assets/token-search-dialog/arbitrum-active.png';
import ASTAR_LOGO from '../assets/token-search-dialog/astar-active.png';
import AVALANCHE_LOGO from '../assets/token-search-dialog/avalanche-active.png';
import BITGERT_LOGO from '../assets/token-search-dialog/bitgert-active.png';
import BNB_LOGO from '../assets/token-search-dialog/bnb-chain-active.png';
import CELO_LOGO from '../assets/token-search-dialog/celo-active.png';
import CUBE_LOGO from '../assets/token-search-dialog/cube-active.png';
import ETHEREUM_LOGO from '../assets/token-search-dialog/ethereum-active.png';
import FANTOM_LOGO from '../assets/token-search-dialog/fantom-active.png';
import GNOSIS_LOGO from '../assets/token-search-dialog/gnosis-active.png';
import KCC_LOGO from '../assets/token-search-dialog/kcc-active.png';
import METIS_LOGO from '../assets/token-search-dialog/metis-active.png';
import NEO_LOGO from '../assets/token-search-dialog/neo-active.png';
import OPTIMISM_LOGO from '../assets/token-search-dialog/optimism-active.png';
import POLYGON_LOGO from '../assets/token-search-dialog/polygon-active.png';
import { cn } from '@/lib/utils';

const TokenList = () => {
    const [crypto, setCrypto] = useState('Ethereum');
    const [search, setSearch] = useState('');

    return (
        <div className="flex gap-2 overflow-hidden">
            <div className="bg-[#1b1e27] flex flex-col gap-3 h-[350px] overflow-auto no-scrollbar rounded-md p-2">
                {[
                    ['Ethereum', ETHEREUM_LOGO],
                    ['Arbitrum', ARBITRUM_LOGO],
                    ['BND Chain', BNB_LOGO],
                    ['Polygon', POLYGON_LOGO],
                    ['Avalanche', AVALANCHE_LOGO],
                    ['Optimism', OPTIMISM_LOGO],
                    ['Neo', NEO_LOGO],
                    ['Bitgert', BITGERT_LOGO],
                    ['Metis', METIS_LOGO],
                    ['Cube', CUBE_LOGO],
                    ['KCC', KCC_LOGO],
                    ['Gnosis', GNOSIS_LOGO],
                    ['Fantom', FANTOM_LOGO],
                    ['Celo', CELO_LOGO],
                ].map(([label, logo], index) => (
                    <div
                        className={cn(
                            'flex gap-3 cursor-pointer p-2 rounded-md',
                            {
                                ' border-2 border-[#88be52]': label === crypto,
                            }
                        )}
                    >
                        <img
                            src={logo}
                            alt={label}
                            className="object-contain h-8 aspect-square"
                            onClick={() => setCrypto(label)}
                        />
                    </div>
                ))}
            </div>
            <ScrollArea className="bg-[#1b1e27] flex flex-col grow gap-3 h-[350px] rounded-md p-2">
                <div className="tags"></div>
                {Array.from({ length: 10 }, (_, index) => (
                    <div
                        key={index}
                        className="flex gap-3 items-center mb-3 hover:bg-[#88be52]/20 rounded-md p-2 cursor-pointer"
                    >
                        <img src={GNOSIS_LOGO} className="h-8 aspect-square" />
                        <div>
                            <div className="font-bold text-lg">Lido</div>
                            <div className="text-sm text-slate-200">
                                Lido DAO Token
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollArea>
        </div>
    );
};

const TokenSearchDialog = ({ buttonStyle }) => {
    const [open, setOpen] = useState(false);
    const { width, height } = useWindowSize();

    return (
        <>
            {width > 768 ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <ChevronDown
                            className="bg-slate-600 rounded-full p-2 hover:bg-slate-700 cursor-pointer min-w-fit"
                            size={35}
                        />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[450px] h-[500px] bg-[#0d0f15] text-white border-2 border-[#2c59ae49]">
                        <DialogHeader>
                            <DialogTitle>Token</DialogTitle>
                            <DialogDescription>
                                <input
                                    type={'text'}
                                    placeholder="Search name"
                                    className="focus:ring-0 focus:outline-none bg-[#1b1e27] w-full p-2 rounded-md mt-5 text-lg mb-1"
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </DialogDescription>
                            <TokenList />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <ChevronDown
                            className="bg-slate-600 rounded-full p-2 hover:bg-slate-700 cursor-pointer min-w-fit"
                            size={35}
                        />
                    </DrawerTrigger>
                    <DrawerContent className="w-full h-[560px] bg-[#0d0f15] text-white p-5">
                        <DrawerHeader className="bg-[#0d0f15] text-white">
                            <DrawerTitle>Token</DrawerTitle>
                            <DrawerDescription>
                                <input
                                    type={'text'}
                                    placeholder="Search name"
                                    className="focus:ring-0 focus:outline-none bg-[#1b1e27] w-full p-2 rounded-md mt-5 text-lg mb-1"
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </DrawerDescription>
                        </DrawerHeader>
                        <TokenList />
                        <DrawerFooter className="pt-2">
                            <DrawerClose asChild>
                                <button className="bg-red-700 py-2 rounded-md">
                                    Cancel
                                </button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
};

export default TokenSearchDialog;
