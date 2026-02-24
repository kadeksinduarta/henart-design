import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import withAuth from '../../../middleware/withAuth';
import Modal from '../../../components/admin/Modal';
import Button from '../../../components/Button';
import { api } from '../../../lib/api';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    FolderIcon,
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import toast from 'react-hot-toast';

function CategoriesIndex() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Create/Edit Modal
    const [formModal, setFormModal] = useState({ isOpen: false, category: null });
    const [formData, setFormData] = useState({ name: '' });
    const [saving, setSaving] = useState(false);

    // Delete Modal
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, category: null });
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await api.get('/categories');
            setCategories(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter((category) =>
        category.name?.toLowerCase().includes(search.toLowerCase())
    );

    // Open create modal
    const openCreateModal = () => {
        setFormData({ name: '' });
        setFormModal({ isOpen: true, category: null });
    };

    // Open edit modal
    const openEditModal = (category) => {
        setFormData({
            name: category.name || '',
        });
        setFormModal({ isOpen: true, category });
    };

    // Submit form (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Category name is required');
            return;
        }

        try {
            setSaving(true);

            if (formModal.category) {
                // Update
                await api.put(`/categories/${formModal.category.id}`, formData);
                toast.success('Category updated successfully!');
            } else {
                // Create
                await api.post('/categories', formData);
                toast.success('Category created successfully!');
            }

            setFormModal({ isOpen: false, category: null });
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error(error.response?.data?.message || 'Failed to save category');
        } finally {
            setSaving(false);
        }
    };

    // Delete category
    const handleDelete = async () => {
        try {
            setDeleting(true);
            await api.delete(`/categories/${deleteModal.category.id}`);
            toast.success('Category deleted successfully!');
            setDeleteModal({ isOpen: false, category: null });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error(error.response?.data?.message || 'Failed to delete category');
        } finally {
            setDeleting(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                        <p className="text-gray-600 mt-1">Manage blog categories</p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        size="lg"
                        className="flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Category
                    </Button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex-1 relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {filteredCategories.length} of {categories.length} categories
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading categories...</p>
                        </div>
                    ) : filteredCategories.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Blogs Count
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Slug
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCategories.map((category) => (
                                            <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center justify-center relative h-10 w-10 py-1 px-1 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                                            <FolderIcon className="h-5 w-5 text-gray-400" />
                                                        </div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {category.name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {category.articles_count || 0}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {category.slug}
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
                                                                        <button
                                                                            onClick={() => openEditModal(category)}
                                                                            className={`${active ? 'bg-gray-50' : ''
                                                                                } flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 rounded-md`}
                                                                        >
                                                                            <PencilIcon className="h-4 w-4" />
                                                                            Edit
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                                <Menu.Item>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => setDeleteModal({ isOpen: true, category })}
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
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <FolderIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-gray-500 mb-4">
                                {search ? 'No categories match your search.' : 'No categories yet. Create your first category!'}
                            </p>
                            {!search && (
                                <Button onClick={openCreateModal}>
                                    <PlusIcon className="h-5 w-5 mr-2" />
                                    Add Category
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Modal */}
            <Modal
                isOpen={formModal.isOpen}
                onClose={() => setFormModal({ isOpen: false, category: null })}
                title={formModal.category ? 'Edit Category' : 'Add New Category'}
                size="md"
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setFormModal({ isOpen: false, category: null })}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            isLoading={saving}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : formModal.category ? 'Update Category' : 'Create Category'}
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="category-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="category-name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter category name"
                        />
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, category: null })}
                title="Delete Category"
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteModal({ isOpen: false, category: null })}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            isLoading={deleting}
                            disabled={deleting}
                        >
                            {deleting ? 'Deleting...' : 'Delete Category'}
                        </Button>
                    </>
                }
            >
                <div className="text-center sm:text-left">
                    <p className="text-gray-600">
                        Are you sure you want to delete <span className="font-semibold">"{deleteModal.category?.name}"</span>?
                        This action cannot be undone.
                    </p>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default withAuth(CategoriesIndex);
