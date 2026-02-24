import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Accordion({ items }) {
    return (
        <div className="w-full space-y-4">
            {items.map((item, index) => (
                <Disclosure key={index}>
                    {({ open }) => (
                        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                            <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                                <span>{item.question}</span>
                                <ChevronUpIcon
                                    className={clsx(
                                        'h-5 w-5 text-primary-600 transition-transform duration-200',
                                        open ? 'rotate-180 transform' : ''
                                    )}
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-6 pb-4 pt-2 text-sm text-gray-600 leading-relaxed">
                                {item.answer}
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            ))}
        </div>
    );
}
