import Converter from '@/components/Converter';
import HubTable from '@/components/HubTable';
import React from 'react';

const Hub = ({}) => {
    return (
        <section className="flex flex-col md:flex-row md:my-[100px] text-white max-w-[1200px] px-5 mx-auto w-full">
            <main className="grow">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1b1e27] p-5 rounded-xl">
                    <div className="text-2xl">Liquidity Pools</div>
                    <div className="flex flex-col md:flex-row gap-10 text-sm">
                        <div className="flex flex-col gap-2">
                            <div>$ 105.43M</div>
                            <div className="text-slate-400">Total Volume</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>$ 747,459.81</div>
                            <div className="text-slate-400">
                                Total pool deposit
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>$ 1,298.45</div>
                            <div className="text-slate-400">24h Volume</div>
                        </div>
                    </div>
                </div>
                <HubTable />
            </main>
            {/* <aside className="w-1/3 relative">
                <div className="sticky top-28 bg-white p-2 mt-10">
                    <Converter />
                </div>
            </aside> */}
        </section>
    );
};

export default Hub;
