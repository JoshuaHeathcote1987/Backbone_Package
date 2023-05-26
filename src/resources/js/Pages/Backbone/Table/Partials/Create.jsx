import React, { useContext, useState, useEffect } from 'react';

// Alerts
import SuccessAlert from '../../Components/Preline/AlertSection/Success/Index';

// Icons
import { TbStars } from 'react-icons/tb';

// Contexts
import { ColumnContext } from '../Contexts/ColumnContext';
import { TableContext } from '../Contexts/TableContext';
import { TableNameContext } from '../Contexts/TableNameContext';

export default function Create({ }) {

    const { columns, setColumns } = useContext(ColumnContext);
    const { objects, setObjects } = useContext(TableContext);
    const { tableName, setTableName } = useContext(TableNameContext);

    const [admittedColumns, setAdmittedColumns] = useState(columns);
    const [title, setTitle] = useState();
    const [inputs, setInputs] = useState([]);
    const [message, setMessage] = useState('');

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    function handleSubmit(e) {
        e.preventDefault();
        let name = tableName;
        let data = buildObject();
        data = { table: name, ...data };

        axios.post('/backbone/table', data)
            .then(function (response) {
                console.log(response);
                setMessage(response.data.message);
                delete data.table;
                data = { id: objects.length + 1, ...data };
                setObjects([...objects, data]);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function buildObject() {
        let obj = {};
        for (let i = 0; i < admittedColumns.length; i++) {
            obj[admittedColumns[i]] = inputs[i];
        }
        return obj;
    }

    function capitalizePlural() {
        let str = tableName;
        str = str.slice(0, -1);
        str = str.charAt(0).toUpperCase() + str.slice(1);
        return str;
    }

    const excluded = new Set([
        'id',
        'email_verified_at',
        'remember_token',
        'updated_at',
        'created_at',
        'expires_at',
        'last_used_at',
    ]);

    useEffect(() => {
        const orderedColumns = admittedColumns.filter(column => !excluded.has(column));
        setAdmittedColumns(orderedColumns);
        let str = capitalizePlural();
        setTitle(str);
    }, []);

    return (
        <>
            <div id="hs-modal-create" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white border border-gray-200 rounded-t-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-4 sm:p-7">
                                <div className="text-center">
                                    <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">Create {title}</h2>
                                </div>

                                <div className="mt-5">
                                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600"><TbStars className="text-3xl" /></div>

                                    <div className="space-y-4">
                                        {admittedColumns.map((column, index) => (
                                            <div key={index}>
                                                <label htmlFor={column} className="block text-sm mb-2 dark:text-white">{column}</label>
                                                <div className="relative">
                                                    <input
                                                        type={column === 'email' ? 'email' : 'text'}
                                                        id={column} name={column}
                                                        key={column.index}
                                                        value={inputs[index] || ""}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                            </div>
                                        ))}
                                        {message && <SuccessAlert message={message} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center rounded-b-xl gap-x-2 py-3 px-4 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-modal-create">
                                Close
                            </button>
                            <button type="submit" className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                Create
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}