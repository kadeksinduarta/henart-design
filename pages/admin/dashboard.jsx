import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/admin/DashboardLayout';
import withAuth from '../../middleware/withAuth';
import { api, getStorageUrl } from '../../lib/api';
import {
    NewspaperIcon,
    FolderIcon,
    EyeIcon,
    CheckCircleIcon,
    ClockIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

function Dashboard() {
    const [stats, setStats] = useState({
        totalArticles: 0,
        publishedArticles: 0,
        draftArticles: 0,
        totalCategories: 0,
        totalProducts: 0,
        totalImpressions: 0
    });
    const [recentArticles, setRecentArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, articlesRes] = await Promise.all([
                api.get('/dashboard/stats'),
                api.get('/articles?per_page=5')
            ]);

            setStats(statsRes.data.data || {});
            const articlesData = articlesRes.data.data?.data || articlesRes.data.data;
            setRecentArticles(Array.isArray(articlesData) ? articlesData : []);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Total Blogs',
            value: stats.totalArticles || 0,
            icon: NewspaperIcon,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600'
        },
        {
            name: 'Published',
            value: stats.publishedArticles || 0,
            icon: CheckCircleIcon,
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600'
        },
        {
            name: 'Draft',
            value: stats.draftArticles || 0,
            icon: DocumentTextIcon,
            color: 'bg-yellow-500',
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600'
        },
        {
            name: 'Categories',
            value: stats.totalCategories || 0,
            icon: FolderIcon,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600'
        },
        {
            name: 'Products',
            value: stats.totalProducts || 0,
            icon: ClockIcon,
            color: 'bg-pink-500',
            bgColor: 'bg-pink-50',
            textColor: 'text-pink-600'
        },
        {
            name: 'Total Views',
            value: stats.totalImpressions || 0,
            icon: EyeIcon,
            color: 'bg-indigo-500',
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-600'
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="text-gray-600">Here's what's happening with your content today.</p>
                </div>

                {/* Stats Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse bg-white rounded-xl p-6">
                                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {statCards.map((stat) => (
                            <div key={stat.name} className="bg-white rounded-xl shadow-soft p-6 hover:shadow-hover transition-shadow">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                        <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                        <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Recent Articles */}
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Blogs</h3>
                        <Link href="/admin/articles" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            View All
                        </Link>
                    </div>

                    {loading ? (
                        <div className="p-6 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse flex gap-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recentArticles.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {recentArticles.map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/admin/articles/edit/${article.id}`}
                                    className="flex items-center gap-4 p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                        {article.thumbnail ? (
                                            <Image
                                                src={getStorageUrl(article.thumbnail)}
                                                alt={article.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <NewspaperIcon className="h-8 w-8 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">{article.title}</h4>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                            <span className={`px-2 py-0.5 rounded-full ${article.status === 'published' ? 'bg-green-100 text-green-700' :
                                                article.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {article.status}
                                            </span>
                                            <span>{article.category?.name || 'Uncategorized'}</span>
                                            <span>•</span>
                                            <span>{article.impressions || 0} views</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            <NewspaperIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                            <p>No blogs yet. Create your first blog!</p>
                            <Link href="/admin/articles/create" className="text-primary-600 hover:text-primary-700 font-medium mt-2 inline-block">
                                Create Blog
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default withAuth(Dashboard);
