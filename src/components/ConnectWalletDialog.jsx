import React, { useState } from 'react';
import { cn } from '@/lib/utils';
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
import METAMASK_LOGO from '../assets/connect-wallet-dialog/logo-MetaMask.png';
import BITKEEP_LOGO from '../assets/connect-wallet-dialog/logo-BitKeep.png';
import CLOVER_LOGO from '../assets/connect-wallet-dialog/logo-clover.png';
import COINBASE_LOGO from '../assets/connect-wallet-dialog/logo-coinbase.png';
import ONTO_LOGO from '../assets/connect-wallet-dialog/logo-onto.png';
import WALLETCONNECT_LOGO from '../assets/connect-wallet-dialog/logo-WalletConnect.png';
import { Plus } from 'lucide-react';

const WalletList = () => {
    return (
        <ScrollArea className="w-full h-full flex flex-col pt-4">
            {[
                ['MetaMask', METAMASK_LOGO],
                ['BitKeep', BITKEEP_LOGO],
                ['CoinBaseWallet', COINBASE_LOGO],
                ['Onto Wallet', ONTO_LOGO],
                ['Clover Wallet', CLOVER_LOGO],
                ['WalletConnect', WALLETCONNECT_LOGO],
            ].map(([label, image]) => (
                <div
                    className="flex justify-between items-center border-2 border-dashed border-slate-600 p-4 my-5 bg-[#1b1e27] rounded-md first:my-0 first:mb-5 cursor-pointer hover:bg-[#2c59ae49]"
                    key={label}
                >
                    <div className="flex gap-4 items-center">
                        <img
                            src={image}
                            alt={label}
                            className="object-contain h-8 w-8 rounded-full"
                        />
                        <div>{label}</div>
                    </div>
                    <Plus className="text-[#88be52]" />
                </div>
            ))}
        </ScrollArea>
    );
};

const ConnectWalletDialog = ({ buttonStyle }) => {
    const [open, setOpen] = useState(false);
    const { width, height } = useWindowSize();

    return (
        <>
            {width > 768 ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <button className={buttonStyle}>Connect Wallet</button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] h-[400px] bg-[#0d0f15] text-white  border-2 border-[#2c59ae49]">
                        <DialogHeader className="overflow-hidden">
                            <DialogTitle>Connect Wallet</DialogTitle>
                            <DialogDescription>EVM Wallet</DialogDescription>
                            <WalletList />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <button className={buttonStyle}>Connect Wallet</button>
                    </DrawerTrigger>
                    <DrawerContent className="w-full h-[500px] bg-[#0d0f15] text-white p-5">
                        <DrawerHeader className="bg-[#0d0f15] text-white">
                            <DrawerTitle>Connect Wallet</DrawerTitle>
                            <DrawerDescription>EVM Wallet</DrawerDescription>
                        </DrawerHeader>
                        <WalletList />
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

export default ConnectWalletDialog;
