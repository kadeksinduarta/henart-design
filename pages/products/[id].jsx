import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import { api, getStorageUrl } from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (id) {
            fetchProduct();
            fetchRelatedProducts();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/products/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async () => {
        try {
            const response = await api.get('/products');
            const allProducts = Array.isArray(response.data.data) ? response.data.data : [];
            setRelatedProducts(allProducts.filter(p => String(p.id) !== String(id)).slice(0, 4));
        } catch (error) {
            console.error('Error fetching related products:', error);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </Layout>
        );
    }

    if (!product) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <Button as={Link} href="/products">
                        <ArrowLeftIcon className="mr-2 h-5 w-5" />
                        Back to Products
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Head>
                <title>{product.name} - Henart Design</title>
                <meta name="description" content={product.description || `${product.name} - Eco-friendly handcrafted art piece by Henart Design`} />
            </Head>

            <section className="py-28 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Back button */}
                    <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-8">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Products
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Product Image */}
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
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
                                    className="object-cover p-8"
                                />
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-medium w-fit mb-4">
                                Eco-Friendly • Handcrafted
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                                {product.name}
                            </h1>
                            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
                                <p>{product.description || 'A beautifully handcrafted eco-friendly art piece made from recycled materials by our skilled artisans in Bali.'}</p>
                            </div>

                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
                                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    Made from recycled materials
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    Handcrafted by skilled artisans
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                                        <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </span>
                                    Unique, one-of-a-kind design
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                <Button
                                    size="lg"
                                    as="a"
                                    href={`https://wa.me/6281246034451?text=Hi, I'm interested in the product: ${product.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Image src="/Gambar/wa.svg" alt="WhatsApp" width={20} height={20} className="mr-2" />
                                    Order via WhatsApp
                                </Button>
                                <Button variant="outline" size="lg" as={Link} href="/contact">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-bold text-gray-900">Other Products</h2>
                            <Link href="/products" className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2 group">
                                View All
                                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/products/${p.id}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                                        {p.image ? (
                                            <img
                                                src={getStorageUrl(p.image)}
                                                alt={p.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <Image
                                                src={`/Gambar/product/product (${((p.id || 1) % 8) + 1}).svg`}
                                                alt={p.name}
                                                fill
                                                className="object-cover p-4"
                                            />
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                                            {p.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
