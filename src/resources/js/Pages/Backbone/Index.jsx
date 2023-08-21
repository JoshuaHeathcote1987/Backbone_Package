import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';

// Icons
import { BsDatabaseFillGear } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import { IoMdAddCircle } from 'react-icons/io';
import { AiFillMinusCircle } from 'react-icons/ai';
import { GiRelationshipBounds } from 'react-icons/gi';
import { TbRelationManyToMany } from 'react-icons/tb';
import { TbRelationOneToMany } from 'react-icons/tb';
import { TbRelationOneToOne } from 'react-icons/tb';
import { GiFamilyTree } from 'react-icons/gi';
import { RxCross1 } from 'react-icons/rx';
import { BsDatabaseFillDown } from 'react-icons/bs';


// Partials
import Search from './Partials/Search';
import TableRelationSelection from './Partials/TableRelationSelection';
import TableCreate from './Partials/TableCreate';
import TableDelete from './Partials/TableDelete';

export default function Tables({ tables }) {

    const [objects, setObjects] = useState(tables);
    const [search, setSearch] = useState('');
    const [destroy, setDestroy] = useState('');
    const [icon, setIcon] = useState(<TbRelationManyToMany />);

    const [relationTableOne, setRelationTableOne] = useState('');
    const [relationTableTwo, setRelationTableTwo] = useState('');
    const [relationType, setRelationType] = useState('');

    const [showDelete, setShowDelete] = useState(false);


    function manyToMany(obj) {
        setRelationTableOne(obj);
        setRelationType('mtm');
        setIcon(<TbRelationManyToMany />);
    }

    function oneToMany(obj) {
        setRelationTableOne(obj)
        setRelationType('otm');
        setIcon(<TbRelationOneToMany />);
    }

    function oneToOne(obj) {
        setRelationTableOne(obj)
        setRelationType('oto');
        setIcon(<TbRelationOneToOne />);
    }

    function belongsTo(obj) {
        setRelationTableOne(obj)
        setRelationType('bt');
        setIcon(<GiFamilyTree />);
    }

    return (
        <>
            {/* Models */}
            <TableRelationSelection icon={icon} objects={objects} selectedTable={relationTableOne} relationType={relationType} />
            <TableCreate />
            <TableDelete tableName={destroy} />
            <Search setSearch={setSearch} />
            {/* End Models */}
            <Head title="Tables" />
            <div className="p-1.5">
                <div className="bg-slate-900">
                    <div className="bg-gradient-to-b relative from-violet-600/[.15] via-transparent">
                        {/* <img className="absolute left-1 top-1" src="/storage/imgs/icons/backbone.png" width="100px" /> */}
                        <IoMdAddCircle className="absolute left-3 bottom-3 text-4xl text-white hover:scale-150 transition" data-hs-overlay="#hs-modal-create-database" />
                        {/* <BsDatabaseFillDown className="absolute left-16 bottom-3 text-4xl text-white hover:scale-150 transition" data-hs-overlay="#hs-modal-create-database" /> */}
                        <ImSearch className="absolute right-3 bottom-3 text-4xl text-white hover:scale-150 transition" data-hs-overlay="#hs-modal-search" />
                        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
                            <div className="max-w-3xl text-center mx-auto">
                                <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl font-serif lg:text-7xl">
                                    Backbone
                                </h1>
                            </div>
                            <div className="max-w-3xl text-center mx-auto">
                                <p className="text-lg text-gray-400">Manage your data effortlessly</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-10 mx-auto">
                    <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
                        <div className="py-3 flex items-center text-sm text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Tables</div>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
                        {objects.filter((find) => {
                            return search.trim() === '' ? find : find.toLowerCase().includes(search.toLowerCase());
                        }).map((obj, key) => (
                            <div key={key} className="relative flex flex-col border border-gray-200 text-center rounded-xl p-8 hover:shadow-xl hover:border-blue-600 transition">
                                <RxCross1 className="absolute left-8 top-5 text-3xl text-red-400 hover:scale-150 hover:text-red-500 transition" onClick={() => setDestroy(obj)} data-hs-overlay="#hs-danger-delete" />
                                <TbRelationManyToMany className="absolute right-8 top-4 text-3xl hover:scale-150 hover:text-lime-600 transition" onClick={() => manyToMany(obj)} data-hs-overlay="#hs-modal-table-relation" />
                                <TbRelationOneToMany className="absolute right-8 top-12 text-3xl hover:scale-150 hover:text-lime-600 transition" onClick={() => oneToMany(obj)} data-hs-overlay="#hs-modal-table-relation" />
                                <TbRelationOneToOne className="absolute right-8 top-20 text-3xl hover:scale-150 hover:text-lime-600 transition" onClick={() => oneToOne(obj)} data-hs-overlay="#hs-modal-table-relation" />
                                <GiFamilyTree className="absolute right-8 top-28 text-3xl hover:scale-150 hover:text-lime-600 transition" onClick={() => belongsTo(obj)} data-hs-overlay="#hs-modal-table-relation" />
                                <h4 className="text-4xl text-gray-800 dark:text-gray-200 mx-auto pb-3"><BsDatabaseFillGear /></h4>
                                <h4 className="font-medium text-lg text-gray-800 dark:text-gray-200 py-3">{obj}</h4>
                                <hr className="mt-4" />
                                <Link className="mt-5 inline-flex justify-center items-center gap-2 rounded-md border-2 border-blue-600 font-semibold text-blue-600 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm py-3 px-4 dark:text-blue-500 dark:border-blue-600 dark:hover:border-blue-700" href={`/backbone/table/${obj}`}>
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}