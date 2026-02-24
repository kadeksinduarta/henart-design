import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import withAuth from '../../../middleware/withAuth';
import Tabs from '../../../components/admin/Tabs';
import Modal from '../../../components/admin/Modal';
import Button from '../../../components/Button';
import { api, getStorageUrl } from '../../../lib/api';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

const statusTabs = [
    { name: 'All', value: '' },
    { name: 'Published', value: 'published' },
    { name: 'Scheduled', value: 'scheduled' },
    { name: 'Draft', value: 'draft' },
    { name: 'Trash', value: 'trash' },
];

function ArticlesIndex() {
    const router = useRouter();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, article: null });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0
    });

    useEffect(() => {
        fetchArticles();
    }, [search, selectedStatus, pagination.currentPage]);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.currentPage
            });

            if (search) params.append('search', search);
            if (selectedStatus) params.append('status', selectedStatus);

            const response = await api.get(`/articles?${params}`);
            const paginatedData = response.data.data || {};
            setArticles(Array.isArray(paginatedData.data) ? paginatedData.data : (Array.isArray(paginatedData) ? paginatedData : []));
            setPagination({
                currentPage: paginatedData.current_page || 1,
                lastPage: paginatedData.last_page || 1,
                total: paginatedData.total || 0
            });
        } catch (error) {
            console.error('Error fetching articles:', error);
            toast.error('Failed to fetch articles');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (article) => {
        try {
            await api.delete(`/articles/${article.id}`);
            toast.success('Article deleted successfully');
            setDeleteModal({ isOpen: false, article: null });
            fetchArticles();
        } catch (error) {
            console.error('Error deleting article:', error);
            toast.error('Failed to delete article');
        }
    };

    const handleRestore = async (article) => {
        try {
            await api.post(`/articles/${article.id}/restore`);
            toast.success('Article restored successfully');
            fetchArticles();
        } catch (error) {
            console.error('Error restoring article:', error);
            toast.error('Failed to restore article');
        }
    };

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Blogs</h2>
                        <p className="text-gray-600 mt-1">Manage your blogs</p>
                    </div>
                    <Button
                        as={Link}
                        href="/admin/articles/create"
                        size="lg"
                        className="flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Create Blog
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPagination(prev => ({ ...prev, currentPage: 1 }));
                                }}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs
                        tabs={statusTabs}
                        onChange={(index) => {
                            setSelectedStatus(statusTabs[index].value);
                            setPagination(prev => ({ ...prev, currentPage: 1 }));
                        }}
                    />
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading blogs...</p>
                        </div>
                    ) : articles.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Title
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Views
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {articles.map((article) => (
                                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                            {article.thumbnail ? (
                                                                <Image
                                                                    src={getStorageUrl(article.thumbnail)}
                                                                    alt={article.title}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                                    <span className="text-xs">No image</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="max-w-xs">
                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                {article.title}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {article.author?.name || 'Admin'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(article.published_at || article.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {article.category?.name || 'Uncategorized'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${article.status === 'published' ? 'bg-green-100 text-green-700' :
                                                        article.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                                                            article.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {article.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {article.impressions || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Menu as="div" className="relative inline-block text-left">
                                                        <Menu.Button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                            <EllipsisVerticalIcon className="h-5 w-5 text-gray-500" />
                                                        </Menu.Button>
                                                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                            <div className="p-1">
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <Link
                                                                            href={`/admin/articles/edit/${article.id}`}
                                                                            className={`${active ? 'bg-gray-50' : ''
                                                                                } flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 rounded-md`}
                                                                        >
                                                                            <PencilIcon className="h-4 w-4" />
                                                                            Edit
                                                                        </Link>
                                                                    )}
                                                                </Menu.Item>
                                                                {article.status === 'trash' ? (
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                onClick={() => handleRestore(article)}
                                                                                className={`${active ? 'bg-gray-50' : ''
                                                                                    } flex items-center gap-3 w-full px-4 py-2 text-sm text-green-600 rounded-md`}
                                                                            >
                                                                                <ArrowPathIcon className="h-4 w-4" />
                                                                                Restore
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                ) : null}
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => setDeleteModal({ isOpen: true, article })}
                                                                            className={`${active ? 'bg-red-50' : ''
                                                                                } flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 rounded-md`}
                                                                        >
                                                                            <TrashIcon className="h-4 w-4" />
                                                                            Delete
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            </div>
                                                        </Menu.Items>
                                                    </Menu>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {pagination.lastPage > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                    <div className="text-sm text-gray-500">
                                        Showing {((pagination.currentPage - 1) * 10) + 1} to {Math.min(pagination.currentPage * 10, pagination.total)} of {pagination.total} results
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                                            disabled={pagination.currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                                            disabled={pagination.currentPage === pagination.lastPage}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-gray-500">No blogs found.</p>
                            <Button
                                as={Link}
                                href="/admin/articles/create"
                                className="mt-4"
                            >
                                Create your first blog
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, article: null })}
                title="Delete Blog"
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteModal({ isOpen: false, article: null })}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(deleteModal.article)}
                        >
                            Delete
                        </Button>
                    </>
                }
            >
                <p className="text-gray-600">
                    Are you sure you want to delete "{deleteModal.article?.title}"? This action cannot be undone.
                </p>
            </Modal>
        </DashboardLayout>
    );
}

export default withAuth(ArticlesIndex);
