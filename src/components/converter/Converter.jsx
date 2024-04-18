import { Settings } from 'lucide-react';
import React from 'react';

const Converter = ({}) => {
    return (
        <div className="converter h-full w-full flex justify-center items-center text-white">
            <div className="rounded-3xl w-[400px] p-10">
                <div className="flex justify-between items-center relative">
                    <div className="bg-[#2e3330] grow rounded-t-3xl p-5">
                        Swap
                    </div>
                    <Settings className="mx-5 swap z-10 cursor-pointer hover:scale-110 active:scale-100" />
                    <div className="absolute bottom-0 right-10 w-20 h-10 rounded-tr-3xl bg-[#2e3330]"></div>
                    <div className="absolute top-6 right-0 w-16 h-10 rounded-bl-3xl bg-[#000000]"></div>
                </div>

                <div className="w-full h-10 rounded-tr-3xl bg-[#2e3330]"></div>
            </div>
        </div>
    );
};

export default Converter;
