import { hubTableData } from '@/lib/constants';
import { ChevronDown, ChevronUp, Minus, Plus, Search } from 'lucide-react';
import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const HubTable = () => {
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [data, setData] = useState(hubTableData);
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleEntries, setVisibleEntries] = useState(10);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });

    const toggleDropdown = index => {
        setDropdownIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        const sorted = [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        return sorted;
    };

    const filteredData = sortedData().filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedDataRows = filteredData
        .slice(0, visibleEntries)
        .map((column, index) => (
            <>
                <tr
                    key={index}
                    className="bg-[#1b1e27] cursor-pointer h-fit"
                    onClick={() => toggleDropdown(index)}
                >
                    <td className="p-4 rounded-l-xl">
                        <div className="flex gap-3 items-center">
                            <img
                                src={column.img}
                                className="h-8 rounded-full object-contain"
                            />
                            {column.name}
                        </div>
                    </td>
                    <td className="p-4">${column.tvl}</td>
                    <td className="p-4">${column.vol}</td>
                    <td className="p-4 last:rounded-r-xl">{column.apr}%</td>
                    <td className="p-4 last:rounded-r-xl">
                        {dropdownIndex === index ? (
                            <ChevronUp />
                        ) : (
                            <ChevronDown />
                        )}
                    </td>
                </tr>
                {dropdownIndex === index && (
                    <tr className="table-fixed">
                        <td colSpan={5} className="px-4">
                            <table className="table-auto w-full border-separate border-spacing-y-2">
                                <thead>
                                    <tr className="text-slate-500">
                                        <td>Chain</td>
                                        <td>APR</td>
                                        <td>Liquidity</td>
                                        <td>Chain</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 4, 5].map((curr, index) => (
                                        <tr>
                                            <td>Ethereum</td>
                                            <td>0%</td>
                                            <td>O3 86,884.45</td>
                                            <td>pO3 248,156.15</td>
                                            <td className="flex items-center gap-4">
                                                <Plus
                                                    className="border-2 border-slate-600 rounded-full p-2"
                                                    size={35}
                                                />
                                                <Minus
                                                    className="border-2 border-slate-600 rounded-full p-2"
                                                    size={35}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                )}
            </>
        ));

    const loadMore = () => {
        setVisibleEntries(prevVisibleEntries => prevVisibleEntries + 10);
    };

    const handleSearchChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div className="flex items-center gap-2 my-4 border-2 border-[#1b1e27] p-3 rounded-lg w-fit">
                <Search size={24} className="text-white" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="focus:outline-none focus:ring-0 bg-transparent"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="w-full table-auto border-separate border-spacing-y-2">
                <thead>
                    <tr>
                        {[
                            ['name', 'Token Pool'],
                            ['tvl', 'TVL'],
                            ['vol', '24h Vol'],
                            ['apr', 'Highest APR'],
                        ].map(([key, label]) => (
                            <td
                                className="p-4 text-slate-400"
                                onClick={() => requestSort(key)}
                            >
                                <div className="flex items-center">
                                    {label}
                                    {sortConfig.key === key ? (
                                        <span className="ml-3">
                                            {sortConfig.direction ===
                                            'ascending' ? (
                                                <div>
                                                    <ChevronUp
                                                        size={16}
                                                        color="#83b74f"
                                                        className="cursor-pointer"
                                                    />
                                                    <ChevronDown
                                                        size={16}
                                                        color="gray"
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    <ChevronUp
                                                        size={16}
                                                        color="gray"
                                                        className="cursor-pointer"
                                                    />
                                                    <ChevronDown
                                                        size={16}
                                                        color="#83b74f"
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                            )}
                                        </span>
                                    ) : (
                                        <div className="ml-3">
                                            <ChevronUp
                                                size={16}
                                                color="gray"
                                                className="cursor-pointer"
                                            />
                                            <ChevronDown
                                                size={16}
                                                color="gray"
                                                className="cursor-pointer"
                                            />
                                        </div>
                                    )}
                                </div>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>{sortedDataRows}</tbody>
            </table>
            {visibleEntries < filteredData.length && (
                <div className="flex justify-center p-4">
                    <button
                        className="flex gap-4 items-center py-5 border-2 border-gray-600 rounded-full px-10"
                        onClick={loadMore}
                    >
                        Load More <ChevronDown />
                    </button>
                </div>
            )}
        </>
    );
};

export default HubTable;
