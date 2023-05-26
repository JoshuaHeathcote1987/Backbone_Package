import React, { useState, useEffect, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';

// Contexts
import { ColumnContext } from './Contexts/ColumnContext';
import { TableContext } from './Contexts/TableContext';
import { ObjectContext } from './Contexts/ObjectContext';
import { TableNameContext } from './Contexts/TableNameContext';
import { DeleteContext } from './Contexts/DeleteContext';
import { UpdateContext } from './Contexts/UpdateContext';

import { ExcludeCreateContext } from './Contexts/ExcludeCreateContext';
import { ExcludeDeleteContext } from './Contexts/ExcludeDeleteContext';
import { ExcludeReadContext } from './Contexts/ExcludeReadContext';
import { ExcludeUpdateContext } from './Contexts/ExcludeUpdateContext';

// Crud
import Read from './Partials/Read';
import Create from './Partials/Create';
import Delete from './Partials/Delete';
import Update from './Partials/Update';
import Settings from './Partials/Settings';

// exludes will have to be redefined in the parameters

export default function Tables({ auth, headings, data, table, excludes }) {
    const [tableName, setTableName] = useState(table);
    const [columns, setColumns] = useState(headings);
    const [objects, setObjects] = useState(data);
    const [object, setObject] = useState({});
    const [deletes, setDeletes] = useState([]);
    const [update, setUpdate] = useState();

    // Colum Headings
    const [columnCreateExcludes, setColumnCreateExcludes] = useState([]);
    const [columnDeleteExcludes, setColumnDeleteExcludes] = useState([]);
    const [columnReadExcludes, setColumnReadExcludes] = useState([]);
    const [columUpdateExcludes, setColumnUpdateExcludes] = useState([]);

    useEffect(() => {
        if (excludes != null) {
            excludes.forEach((obj) => {
                const { crud_title } = obj;
                if (crud_title === 'read') {
                    setColumnReadExcludes((prevExcludes) => [...prevExcludes, obj.column_title]);
                } else if (crud_title === 'create') {
                    setColumnCreateExcludes((prevExcludes) => [...prevExcludes, obj.column_title]);
                } else if (crud_title === 'delete') {
                    setColumnDeleteExcludes((prevExcludes) => [...prevExcludes, obj.column_title]);
                } else if (crud_title === 'update') {
                    setColumnUpdateExcludes((prevExcludes) => [...prevExcludes, obj.column_title]);
                }
            });
        }
    }, [])

    const handleGoBack = (event) => {
        event.preventDefault();
        window.history.back();
    };

    return (
        <>
            <Head title="Tables" />
            <div className="p-1.5">
                <div className="flex justify-between">
                    <Link
                        onClick={handleGoBack}
                        className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                    >
                        Back
                    </Link>
                    {
                        auth != undefined ?
                            <Link
                                method="post" as="button" type="button" href="/logout"
                                className="mb-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                            >
                                Logout
                            </Link>
                            : ''
                    }

                </div>


                <TableNameContext.Provider value={{ tableName, setTableName }}>
                    <ColumnContext.Provider value={{ columns, setColumns }}>
                        <TableContext.Provider value={{ objects, setObjects }}>
                            <DeleteContext.Provider value={{ deletes, setDeletes }}>
                                <UpdateContext.Provider value={{ update, setUpdate }}>
                                    <ObjectContext.Provider value={{ object, setObject }}>
                                        <ExcludeCreateContext.Provider value={{ columnCreateExcludes, setColumnCreateExcludes }}>
                                            <ExcludeDeleteContext.Provider value={{ columnDeleteExcludes, setColumnDeleteExcludes }}>
                                                <ExcludeReadContext.Provider value={{ columnReadExcludes, setColumnReadExcludes }}>
                                                    <ExcludeUpdateContext.Provider value={{ columUpdateExcludes, setColumnUpdateExcludes }}>
                                                        {auth != undefined ? <Settings user_id={auth.id} /> : ''}
                                                        <Create />
                                                        <Read auth={auth} />
                                                        <Update />
                                                        <Delete />
                                                    </ExcludeUpdateContext.Provider>
                                                </ExcludeReadContext.Provider>
                                            </ExcludeDeleteContext.Provider>
                                        </ExcludeCreateContext.Provider>
                                    </ObjectContext.Provider>
                                </UpdateContext.Provider>
                            </DeleteContext.Provider>
                        </TableContext.Provider>
                    </ColumnContext.Provider>
                </TableNameContext.Provider>
            </div>
        </>
    );
}