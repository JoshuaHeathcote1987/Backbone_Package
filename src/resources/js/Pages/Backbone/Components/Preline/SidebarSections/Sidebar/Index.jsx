import react, { useEffect, useState } from 'react';
import { BsTable, BsCalendar, BsBook } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { VscDebugBreakpointLog } from 'react-icons/vsc';


import { Link } from '@inertiajs/react';

export default function SidebarSections() {

    const pathname = window.location.pathname;

    const [objects, setObjects] = useState([]);

    const urls = [
        { name: 'Dashboard', url: '/admin/dashboard', icon: <AiOutlineHome />, children: '' },
        {
            name: 'Backbone',
            icon: <BsTable />,
            children: objects.map((object) => ({ 
                name: object,
                url: `/admin/table/${object}`,
                icon: <VscDebugBreakpointLog />, 
            }))
        },
        { name: 'Arrangement', url: '/admin/calendar', icon: <BsCalendar />, children: '' },
        { name: 'Documentation', url: '/admin/documentation', icon: <BsBook />, children: '' },
    ];

    const getObjects = () => {
        axios.get('/admin/schema')
            .then(function (response) {
                setObjects(response.data); // set objects state to response data
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getObjects();
        console.log(objects);
    }, []);

    return (
        <>
            <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center py-4">
                    <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle Navigation</span>
                        <svg className="w-5 h-5" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                        </svg>
                    </button>

                    <ol className="ml-3 flex items-center whitespace-nowrap min-w-0" aria-label="Breadcrumb">
                        <li className="flex items-center text-sm text-gray-800 dark:text-gray-400">
                            Application Layout
                            <svg className="flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 dark:text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </li>
                        <li className="text-sm font-semibold text-gray-800 truncate dark:text-gray-400" aria-current="page">
                            Dashboard
                        </li>
                    </ol>
                </div>
            </div>

            <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[60] w-64 bg-white border-r border-gray-200 pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700">
                <div className="px-6">
                    <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Brand</a>
                </div>

                <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul className="space-y-1.5">

                        {urls.map((object, index) => (
                            <li key={index} className="hs-accordion" id="projects-accordion">
                                <a className="hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white" href={object.url}>
                                    {object.icon}
                                    {object.name}
                                    {object.children &&
                                        <>
                                            <svg className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                            </svg>
                                            <svg className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                                            </svg>
                                        </>
                                    }
                                </a>

                                {object.children &&
                                    <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                                        <ul className="pt-2 pl-2">
                                            {object.children.map((x, i) => (
                                                <li key={i}>
                                                    <Link className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300" href={x.url}>
                                                        {x.icon}
                                                        {x.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>
                </nav>
            </div >
        </>
    );
}