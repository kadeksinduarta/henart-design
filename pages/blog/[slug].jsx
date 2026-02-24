import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { api, getStorageUrl } from '../../lib/api';
import { CalendarIcon, UserIcon, EyeIcon, TagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function BlogDetail() {
    const router = useRouter();
    const { slug } = router.query;
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchArticle();
        }
    }, [slug]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/articles/${slug}`);
            setArticle(response.data.data);

            // Fetch related articles
            if (response.data.data.category_id) {
                const relatedRes = await api.get(`/articles?category_id=${response.data.data.category_id}&limit=3`);
                const relatedArray = Array.isArray(relatedRes.data.data) ? relatedRes.data.data : (relatedRes.data.data?.data || []);
                setRelatedArticles(relatedArray.filter(a => a.id !== response.data.data.id));
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            if (error.response?.status === 404) {
                router.push('/404');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen bg-white py-24">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (!article) {
        return (
            <Layout>
                <div className="min-h-screen bg-white py-24 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Article not found</h1>
                        <p className="mt-2 text-gray-600">The article you're looking for doesn't exist.</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <article className="bg-white">
                {/* Header */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 py-16">
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        {article.category && (
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-xs font-medium text-white">
                                    <TagIcon className="h-3 w-3" />
                                    {article.category.name}
                                </span>
                            </div>
                        )}
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <UserIcon className="h-5 w-5" />
                                <span>{article.author?.name || 'Admin'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5" />
                                <time dateTime={article.published_at}>
                                    {new Date(article.published_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </time>
                            </div>
                            <div className="flex items-center gap-2">
                                <EyeIcon className="h-5 w-5" />
                                <span>{article.impressions || 0} views</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {article.thumbnail && (
                    <div className="mx-auto max-w-5xl px-6 lg:px-8 -mt-8">
                        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={getStorageUrl(article.thumbnail)}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16">
                    {article.excerpt && (
                        <div className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
                            {article.excerpt}
                        </div>
                    )}

                    <div
                        className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-primary-600 prose-img:rounded-xl"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="bg-gray-50 py-16">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {relatedArticles.map((related) => (
                                    <Card
                                        key={related.id}
                                        title={related.title}
                                        description={related.excerpt}
                                        image={related.thumbnail ? getStorageUrl(related.thumbnail) : `/Gambar/product/product (${((related.id || 1) % 8) + 1}).svg`}
                                        href={`/blog/${related.slug}`}
                                        badge={related.category?.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </article>
        </Layout>
    );
}
