import { Tab } from '@headlessui/react';
import clsx from 'clsx';

export default function Tabs({ tabs, onChange }) {
    return (
        <Tab.Group onChange={onChange}>
            <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
                {tabs.map((tab) => (
                    <Tab
                        key={tab.name}
                        className={({ selected }) =>
                            clsx(
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all',
                                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-400 ring-white ring-opacity-60',
                                selected
                                    ? 'bg-white text-primary-700 shadow'
                                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-gray-800'
                            )
                        }
                    >
                        <div className="flex items-center justify-center gap-2">
                            <span>{tab.name}</span>
                            {tab.count !== undefined && (
                                <span className={clsx(
                                    "px-2 py-0.5 rounded-full text-xs",
                                    tab.selected ? "bg-primary-100 text-primary-700" : "bg-gray-200 text-gray-600"
                                )}>
                                    {tab.count}
                                </span>
                            )}
                        </div>
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    );
}
