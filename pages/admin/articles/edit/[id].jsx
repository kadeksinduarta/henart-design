import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import DashboardLayout from '../../../../components/admin/DashboardLayout';
import withAuth from '../../../../middleware/withAuth';
import ImageUpload from '../../../../components/admin/ImageUpload';
import Button from '../../../../components/Button';
import { api, getStorageUrl } from '../../../../lib/api';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import toast from 'react-hot-toast';

// Dynamic import for rich text editor
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const quillModules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean'],
    ],
};

function EditArticle() {
    const router = useRouter();
    const { id } = router.query;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category_id: '',
        excerpt: '',
        content: '',
        status: 'draft',
        published_at: '',
    });
    const [thumbnail, setThumbnail] = useState(null);
    const [existingThumbnail, setExistingThumbnail] = useState(null);

    useEffect(() => {
        if (id) {
            fetchArticle();
            fetchCategories();
        }
    }, [id]);

    const fetchArticle = async () => {
        try {
            setFetching(true);
            const response = await api.get(`/articles/${id}`);
            const article = response.data.data;

            setFormData({
                title: article.title || '',
                category_id: article.category_id || '',
                excerpt: article.excerpt || '',
                content: article.content || '',
                status: article.status || 'draft',
                published_at: article.published_at ? new Date(article.published_at).toISOString().slice(0, 16) : '',
            });

            if (article.thumbnail) {
                setExistingThumbnail(getStorageUrl(article.thumbnail));
            }
        } catch (error) {
            console.error('Error fetching article:', error);
            toast.error('Failed to load article');
            router.push('/admin/articles');
        } finally {
            setFetching(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = useCallback((value) => {
        setFormData((prev) => ({ ...prev, content: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.category_id || !formData.content) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();
            data.append('title', formData.title);
            data.append('category_id', formData.category_id);
            data.append('excerpt', formData.excerpt);
            data.append('content', formData.content);
            data.append('status', formData.status);
            data.append('_method', 'PUT');

            if (formData.published_at) {
                data.append('published_at', formData.published_at);
            } else if (formData.status === 'published') {
                data.append('published_at', new Date().toISOString());
            }

            if (thumbnail) {
                data.append('thumbnail', thumbnail);
            }

            await api.post(`/articles/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            toast.success('Blog updated successfully!');
            router.push('/admin/articles');
        } catch (error) {
            console.error('Error updating article:', error);
            toast.error(error.response?.data?.message || 'Failed to update blog');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/articles"
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Edit Blog</h2>
                        <p className="text-gray-600 mt-1">Update your blog content</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title */}
                            <div className="bg-white rounded-xl shadow-soft p-6">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
                                    placeholder="Enter blog title..."
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="bg-white rounded-xl shadow-soft p-6">
                                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                    placeholder="Brief summary of the blog..."
                                ></textarea>
                            </div>

                            {/* Content Editor */}
                            <div className="bg-white rounded-xl shadow-soft p-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Content <span className="text-red-500">*</span>
                                </label>
                                <div className="prose-editor">
                                    <ReactQuill
                                        theme="snow"
                                        value={formData.content}
                                        onChange={handleContentChange}
                                        modules={quillModules}
                                        placeholder="Write your blog content here..."
                                        className="min-h-[300px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Publish Settings */}
                            <div className="bg-white rounded-xl shadow-soft p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Publish</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="scheduled">Scheduled</option>
                                        </select>
                                    </div>

                                    {formData.status === 'scheduled' && (
                                        <div>
                                            <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
                                                Publish Date
                                            </label>
                                            <input
                                                id="published_at"
                                                name="published_at"
                                                type="datetime-local"
                                                value={formData.published_at}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category_id"
                                            name="category_id"
                                            required
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            className="flex-1"
                                            isLoading={loading}
                                            disabled={loading}
                                        >
                                            {loading ? 'Updating...' : 'Update Blog'}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail */}
                            <div className="bg-white rounded-xl shadow-soft p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thumbnail</h3>
                                <ImageUpload
                                    label=""
                                    value={existingThumbnail}
                                    onChange={(file) => setThumbnail(file)}
                                    onRemove={() => {
                                        setThumbnail(null);
                                        setExistingThumbnail(null);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <style jsx global>{`
                .prose-editor .ql-container {
                    min-height: 300px;
                    font-size: 16px;
                }
                .prose-editor .ql-editor {
                    min-height: 300px;
                }
                .prose-editor .ql-toolbar {
                    border-radius: 8px 8px 0 0;
                    border-color: #e5e7eb;
                }
                .prose-editor .ql-container {
                    border-radius: 0 0 8px 8px;
                    border-color: #e5e7eb;
                }
            `}</style>
        </DashboardLayout>
    );
}

export default withAuth(EditArticle);
