import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { api, getStorageUrl } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    Squares2X2Icon,
    ListBulletIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import Button from '../../components/Button';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/products');
            setProducts(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout>
            <Head>
                <title>Our Products - Henart Design | Eco-Friendly Handcrafted Art</title>
                <meta name="description" content="Browse the complete collection of Henart Design's eco-friendly handcrafted art pieces. Each product is made from recycled materials by skilled Balinese artisans." />
            </Head>

            {/* Hero Banner */}
            <section className="relative py-28 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6">
                        <SparklesIcon className="h-4 w-4" />
                        Handcrafted Collection
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                        Our{' '}
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                            Products
                        </span>
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our complete collection of unique, eco-friendly art pieces.
                        Each item is handcrafted from recycled materials by our talented artisans in Bali.
                    </p>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-16 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
                        <div className="flex-1 w-full md:max-w-md relative">
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 transition-all hover:bg-white"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">
                                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </span>
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Squares2X2Icon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <ListBulletIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' : 'grid-cols-1 gap-4'}`}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className={`bg-gray-200 rounded-2xl ${viewMode === 'grid' ? 'aspect-square' : 'h-32'}`}></div>
                                    <div className="mt-4 space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-hover"
                                    >
                                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                                            {product.image ? (
                                                <img
                                                    src={getStorageUrl(product.image)}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Image
                                                        src={`/Gambar/product/product (${((product.id || 1) % 8) + 1}).svg`}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover p-4"
                                                    />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                            <div className="absolute bottom-4 left-4 right-4 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                                <span className="text-white font-medium text-sm flex items-center gap-2">
                                                    View Details
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                                                {product.name}
                                            </h3>
                                            {product.description && (
                                                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.id}`}
                                        className="group flex items-center gap-6 p-4 rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-hover transition-all duration-300"
                                    >
                                        <div className="relative h-28 w-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                            {product.image ? (
                                                <img
                                                    src={getStorageUrl(product.image)}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Image
                                                    src={`/Gambar/product/product (${((product.id || 1) % 8) + 1}).svg`}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover p-2"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            {product.description && (
                                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className="hidden sm:flex items-center text-primary-600 font-medium text-sm gap-2 flex-shrink-0">
                                            View Details
                                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                                <MagnifyingGlassIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 mb-6">
                                {search ? `No products match "${search}". Try a different search.` : 'No products available at the moment.'}
                            </p>
                            {search && (
                                <Button variant="outline" onClick={() => setSearch('')}>
                                    Clear Search
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Interested in Custom Orders?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We accept custom orders and can create unique pieces tailored to your preferences.
                        Contact us to discuss your ideas!
                    </p>
                    <Button size="lg" as={Link} href="/contact">
                        Get in Touch
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Button>
                </div>
            </section>
        </Layout>
    );
}
