import React, { useContext, useState, useEffect } from 'react';

// Icons
import { AiFillSetting, AiFillEdit, AiFillPrinter } from 'react-icons/ai';

// Contexts
import { ColumnContext } from '../Contexts/ColumnContext';
import { TableContext } from '../Contexts/TableContext';
import { TableNameContext } from '../Contexts/TableNameContext';
import { DeleteContext } from '../Contexts/DeleteContext';
import { ObjectContext } from '../Contexts/ObjectContext';

import { ExcludeReadContext } from '../Contexts/ExcludeReadContext';

export default function Read({ auth }) {

    const { columnReadExcludes, setColumnReadExcludes } = useContext(ExcludeReadContext);

    const { columns, setColumns } = useContext(ColumnContext);
    const { objects, setObjects } = useContext(TableContext);
    const { tableName, setTableName } = useContext(TableNameContext);
    const { deletes, setDeletes } = useContext(DeleteContext);
    const { object, setObject } = useContext(ObjectContext);

    const [admittedColumns, setAdmittedColumns] = useState(columns);
    const [admittedObjects, setAdmittedObjects] = useState(objects);

    const [search, setSearch] = useState('');

    const [checkedBoxes, setCheckedBoxes] = useState([]);

    const handleCheckboxChange = (id) => {
        if (checkedBoxes.includes(id)) {
            setCheckedBoxes(checkedBoxes.filter((boxId) => boxId !== id));
        } else {
            setCheckedBoxes([...checkedBoxes, id]);
        }
    };

    useEffect(() => {
        const excluded = new Set([...columnReadExcludes]);
        const admittedColumns = columns;
        setAdmittedColumns(admittedColumns);
        setAdmittedObjects(objects);

        setAdmittedColumns(admittedColumns.filter(column => !excluded.has(column)));

        setAdmittedObjects(prevObjects =>
            prevObjects.map(obj => {
                const newObj = { ...obj };
                for (const prop of excluded) {
                    delete newObj[prop];
                }
                return newObj;
            })
        );

    }, [objects, columnReadExcludes]);

    function handlePushToDelete({ id, ...data }) {
        const objectToDelete = admittedObjects.find((obj) => obj.id === id);

        if (objectToDelete) {
            setDeletes((prevDeletes) => {
                const isObjectInDeletes = prevDeletes.some((obj) => obj.id === id);
                if (isObjectInDeletes) {
                    // Remove the object from deletes
                    return prevDeletes.filter((obj) => obj.id !== id);
                } else {
                    // Add the new object to deletes
                    return [...prevDeletes, objectToDelete];
                }
            });
        }
    }

    function capitalize(x) {
        let str = x;
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    }

    function handleUpdateObject(id) {
        const obj = objects.find((obj) => obj.id === id);
        setObject(obj);
    }

    return (
        <>
            <div className="flex flex-col">

                <div className="min-w-full inline-block align-middle">
                    {/* <div className="flex flex-row p-4">

                        <div className="w-5/6 flex-row">
                            <span className="text-2xl">{capitalize(tableName)}</span> <span className="font-light">({objects.length})</span>
                        </div>
                        <div className="w-1/6 flex justify-end">
                            <AiFillPrinter onclick={() => printPage()} className="text-3xl m-1 hover:scale-150 ease-out duration-300 transition text-blue-400 hover:text-blue-600" />
                            <BsFillFileEarmarkSpreadsheetFill className="text-2xl m-1 hover:scale-150 ease-out duration-300 transition text-purple-400 hover:text-purple-600" />
                        </div>
                    </div> */}
                    <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                        <div className="flex py-3 px-4">
                            <div className="relative max-w-xs">
                                <label htmlFor="hs-table-search" className="sr-only">Search</label>
                                <input type="text" name="search" id="search" className="p-3 pl-10 block w-full border-gray-200 shadow-md rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                                    <svg className="h-3.5 w-3.5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="inline-flex gap-x-2 w-full justify-end">
                                <button className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-red-600 shadow-md align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-red-500 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-danger-delete">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                    Delete ({deletes.length})
                                </button>
                                <button className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-green-600 shadow-md align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-green-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-green-500 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-create">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    Create
                                </button>

                                {auth != undefined ?
                                    <button className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-yellow-600 shadow-md align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-yellow-500 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-bg-gray-on-hover-cards">
                                        <AiFillSetting />
                                        Settings
                                    </button>
                                    : ''}
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <td className="h-px w-px whitespace-nowrap">
                                            <div className="pl-6 py-2">
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </div>
                                        </td>
                                        {admittedColumns ?
                                            admittedColumns.map((column, index) => (
                                                <th key={index} scope="col" className="px-6 py-3 text-left">
                                                    <div className="flex items-center gap-x-2">
                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                            {column}

                                                        </span>
                                                    </div>
                                                </th>
                                            ))
                                            :
                                            ''
                                        }
                                        <td className="h-px w-px whitespace-nowrap">
                                            <div className="px-6 py-2 flex gap-x-1">
                                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                    Update
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {admittedObjects.filter((find) => {
                                        return search.trim() === '' ? find : find.name.toLowerCase().includes(search.toLowerCase());
                                    }).map((data, x) => (
                                        <tr key={x}>
                                            <td className="h-px w-px whitespace-nowrap">
                                                <div className="pl-6 py-2">
                                                    <label htmlFor={`hs-at-with-checkboxes-${x}`} className="flex">
                                                        <input
                                                            onClick={() => handlePushToDelete(data)}
                                                            type="checkbox"
                                                            className="shrink-0 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                            checked={checkedBoxes.includes(data.id)}
                                                            onChange={() => handleCheckboxChange(data.id)}
                                                            id={`hs-at-with-checkboxes-${x}`}
                                                            name={`hs-at-with-checkboxes-${x}`}
                                                        />
                                                    </label>
                                                </div>
                                            </td>
                                            {Object.keys(data).map((obj, i) => (
                                                <td key={i} className="h-px w-px whitespace-nowrap">
                                                    <div className="px-6 py-2 flex gap-x-1">
                                                        <span className="text-xs text-gray-600 dark:text-gray-400">
                                                            {data[obj]}
                                                        </span>
                                                    </div>
                                                </td>
                                            ))}
                                            <td className="h-px w-px whitespace-nowrap">
                                                <div className="px-6 py-2 flex gap-x-1">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        <AiFillEdit
                                                            onClick={() => handleUpdateObject(data.id)}
                                                            className="text-2xl hover:scale-150 ease-out duration-300 transition"
                                                            data-hs-overlay="#hs-modal-update"
                                                        />
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}