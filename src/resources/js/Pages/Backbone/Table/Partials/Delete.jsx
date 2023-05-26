import React, { useContext, useState, useEffect } from 'react';

// Contexts
import { ColumnContext } from '../Contexts/ColumnContext';
import { DeleteContext } from '../Contexts/DeleteContext';
import { TableNameContext } from '../Contexts/TableNameContext';
import { TableContext } from '../Contexts/TableContext';

export default function Delete({ }) {

    const { deletes, setDeletes } = useContext(DeleteContext);
    const { columns, setColumns } = useContext(ColumnContext);
    const { objects, setObjects } = useContext(TableContext);
    const { tableName, setTableName } = useContext(TableNameContext);

    const [admittedColumns, setAdmittedColumns] = useState(columns);
    const [admittedObjects, setAdmittedObjects] = useState([]);
    const [message, setMessage] = useState('');

    const excluded = new Set([
        'admin',
        'email',
        'email_verified_at',
        'remember_token',
        'password',
        'created_at',
        'updated_at',
        'expires_at',
        'last_used_at',
        'telephone',
    ]);

    useEffect(() => {
        let arr = [...deletes];
        setAdmittedObjects(deletes);
        const orderedColumns = admittedColumns.filter(column => !excluded.has(column));
        setAdmittedColumns(orderedColumns);
        setAdmittedObjects(prevObjects =>
            prevObjects.map(obj => {
                const newObj = { ...obj };
                for (const prop of excluded) {
                    delete newObj[prop];
                }
                return newObj;
            })
        );
    }, [deletes]);

    const tableData = admittedObjects.map(obj => Object.values(obj));

    function removeFromAdmittedObjects() {
        // Make a copy of the current objects array
        const newObjects = [...objects];

        // Remove any items from newObjects that are also in the deletes array
        let arr = newObjects.filter(obj => !deletes.some(deleteObj => deleteObj.id === obj.id));
        setObjects(arr);

        // Clear the deletes array
        setDeletes([]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let data = deletes.map(object => object.id);
        data.unshift(tableName);
        axios.delete(`/backbone/table/${tableName}`, { data: data })
            .then(function (response) {
                console.log(response);
                setMessage(response.data.message);
                removeFromAdmittedObjects();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div id="hs-danger-delete" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                    <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                        <div className="absolute top-2 right-2">
                            <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-danger-delete">
                                <span className="sr-only">Close</span>
                                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 sm:p-10 overflow-y-auto">
                            <div className="flex gap-x-4 md:gap-x-7">
                                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                </span>

                                <div className="grow space-y-4">
                                    <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                        Deletion
                                    </h3>
                                    <p className="text-gray-500">
                                        Please take a moment to consider the consequences of deleting data, as it will be lost permanently and cannot be recovered. Before proceeding, ensure that you have a backup of any critical information and are deleting the correct data.
                                    </p>
                                    <div className="bg-red-50 border border-red-200 rounded-md p-4" role="alert">
                                        <div className="flex">
                                            <div className="ml-4">
                                                <div className="flex flex-col">
                                                    <div className="-m-1.5 overflow-x-auto">
                                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                                            <div className="overflow-hidden">
                                                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                                    <thead>
                                                                        <tr>
                                                                            {admittedColumns.map((column, index) => (
                                                                                <th key={index} scope="col" className="px-6 py-3 text-left">
                                                                                    <div className="flex items-center gap-x-2">
                                                                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                                                            {column}
                                                                                        </span>
                                                                                    </div>
                                                                                </th>
                                                                            ))}
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                                        {tableData.map((data, x) => (
                                                                            <tr key={x}>
                                                                                {admittedColumns.map((column, y) => (
                                                                                    <td key={y} className="h-px w-px whitespace-nowrap">
                                                                                        <div className="px-6 py-2 flex gap-x-1">
                                                                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                                                                {data[y]}
                                                                                            </span>
                                                                                        </div>
                                                                                    </td>
                                                                                ))}
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {message && <SuccessAlert message={message} />} */}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                            <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-danger-delete">
                                Close
                            </button>
                            <button onClick={handleSubmit} type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:opacity-75" data-hs-overlay="#hs-danger-delete" disabled={deletes.length <= 0 ? true : false}>
                                Delete data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}