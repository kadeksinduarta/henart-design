import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { getStorageUrl } from '../lib/api';

export default function Card({
    title,
    subtitle,
    image,
    href,
    className,
    type = 'product', // 'product' or 'article'
    date,
    author
}) {
    return (
        <Link
            href={href}
            className={clsx(
                "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-hover",
                className
            )}
        >
            <div className={clsx(
                "relative overflow-hidden bg-gray-200",
                type === 'product' ? "aspect-square" : "aspect-[16/9]"
            )}>
                {image ? (
                    <img
                        src={getStorageUrl(image)}
                        alt={title}
                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <span className="text-4xl font-light">HD</span>
                    </div>
                )}

                {/* Overlay for products */}
                {type === 'product' && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                )}
            </div>

            <div className="flex flex-1 flex-col p-6">
                {type === 'article' && (
                    <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                        {date && <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>}
                        {author && (
                            <>
                                <span>•</span>
                                <span>{author}</span>
                            </>
                        )}
                    </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {title}
                </h3>

                {subtitle && (
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {subtitle}
                    </p>
                )}

                {/* Product specifics */}
                {type === 'product' && (
                    <div className="mt-auto pt-4 absolute bottom-6 right-6 translate-y-10 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-white font-medium">View Details &rarr;</span>
                    </div>
                )}

                {/* Article specifics */}
                {type === 'article' && (
                    <div className="mt-4 flex items-center text-sm font-medium text-primary-600">
                        Read Article &rarr;
                    </div>
                )}
            </div>
        </Link>
    );
}
