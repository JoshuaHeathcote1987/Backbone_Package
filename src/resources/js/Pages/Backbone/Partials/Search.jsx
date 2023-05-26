import React from 'react';

// Icons
import { ImSearch } from 'react-icons/im';

export default function Search({ setSearch }) {

    return (
        <>
            <div id="hs-modal-search" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 sm:p-7">
                            <form>
                                <div className="grid gap-y-4">
                                    <div>
                                        <div className="relative">
                                            <ImSearch className="absolute right-3 bottom-3 text-2xl" />
                                            <input onChange={e => setSearch(e.target.value)} type="text" id="search" name="search" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}