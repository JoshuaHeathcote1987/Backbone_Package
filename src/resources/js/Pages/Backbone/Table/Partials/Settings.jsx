import React, { useContext, useState, useEffect } from 'react';

// Contexts
import { ColumnContext } from '../Contexts/ColumnContext';
import { TableContext } from '../Contexts/TableContext';
import { TableNameContext } from '../Contexts/TableNameContext';
import { DeleteContext } from '../Contexts/DeleteContext';

import { ExcludeCreateContext } from '../Contexts/ExcludeCreateContext';
import { ExcludeDeleteContext } from '../Contexts/ExcludeDeleteContext';
import { ExcludeReadContext } from '../Contexts/ExcludeReadContext';
import { ExcludeUpdateContext } from '../Contexts/ExcludeUpdateContext';

export default function Settings({ user_id }) {

    const { columns, setColumns } = useContext(ColumnContext);
    const { tableName, setTableName } = useContext(TableNameContext);

    const { columnReadExcludes, setColumnReadExcludes } = useContext(ExcludeReadContext);
    const { columnCreateExcludes, setColumnCreateExcludes } = useContext(ExcludeCreateContext);
    

    const crud_title_arr = ['create', 'read', 'update', 'delete'];

    const [readCheckBoxes, setReadCheckBoxes] = useState([]);

    function handleCheckboxChange(obj) {
        const updatedCheckBoxes = readCheckBoxes.map((checkbox) => {
            if (checkbox === obj) {
                return {
                    ...checkbox,
                    checked: !checkbox.checked
                };
            }
            return checkbox;
        });

        setReadCheckBoxes(updatedCheckBoxes);
    }

    function store(obj) {
        axios.post('/backbone/settings', obj)
            .then(function (response) {
                console.log(response);
                if (columnReadExcludes.includes(obj.column_title)) {
                    setColumnReadExcludes(columnReadExcludes.filter((item) => item !== obj.column_title));
                } else {
                    setColumnReadExcludes([...columnReadExcludes, obj.column_title]);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    useEffect(() => {
        setReadCheckBoxes(columns.map((column, key) => {
            const isChecked = columnReadExcludes.includes(column) ? false : true;
            
            return {
                user_id: user_id,
                table_name: tableName,
                crud_title: 'read',
                column_title: column,
                checked: isChecked,
            };
        }));

    }, [columnReadExcludes]);


    return (
        <>
            <div id="hs-bg-gray-on-hover-cards" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-4 overflow-y-auto">
                            <div className="sm:divide-y divide-gray-200 dark:divide-gray-700">
                                <div className="py-3 sm:py-6">
                                    <h3 className="mb-2 font-semibold text-xl text-gray-600 dark:text-gray-400">
                                        Settings
                                    </h3>
                                    <div className="py-3 flex items-center text-sm text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Read display</div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {readCheckBoxes.map((obj, key) => (
                                            <label key={key} htmlFor="hs-checkbox-in-form" className="flex p-3 block w-full bg-white border border-gray-200 rounded-md text-sm hover:bg-gray-100 focus:border-blue-500 focus:ring-blue-50">
                                                <input
                                                    onClick={() => store(obj)}
                                                    type="checkbox"
                                                    className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600  focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                    id={`hs-checkbox-in-form-${'read-' + key}`}
                                                    checked={obj.checked}
                                                    onChange={() => handleCheckboxChange(obj)}
                                                />
                                                <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">{obj.column_title}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}