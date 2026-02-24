import { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/admin/DashboardLayout';
import withAuth from '../../../middleware/withAuth';
import Modal from '../../../components/admin/Modal';
import ImageUpload from '../../../components/admin/ImageUpload';
import Button from '../../../components/Button';
import { api, getStorageUrl } from '../../../lib/api';
import {
    MagnifyingGlassIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    EllipsisVerticalIcon,
    CubeIcon,
} from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';
import Image from 'next/image';
import toast from 'react-hot-toast';

function ProductsIndex() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    // Create/Edit Modal
    const [formModal, setFormModal] = useState({ isOpen: false, product: null });
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [productImage, setProductImage] = useState(null);
    const [existingImage, setExistingImage] = useState(null);
    const [saving, setSaving] = useState(false);

    // Delete Modal
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
    const [deleting, setDeleting] = useState(false);

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
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase())
    );

    // Open create modal
    const openCreateModal = () => {
        setFormData({ name: '', description: '' });
        setProductImage(null);
        setExistingImage(null);
        setFormModal({ isOpen: true, product: null });
    };

    // Open edit modal
    const openEditModal = (product) => {
        setFormData({
            name: product.name || '',
            description: product.description || '',
        });
        setProductImage(null);
        setExistingImage(product.image ? getStorageUrl(product.image) : null);
        setFormModal({ isOpen: true, product });
    };

    // Submit form (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            toast.error('Product name is required');
            return;
        }

        try {
            setSaving(true);
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);

            if (productImage) {
                data.append('image', productImage);
            }

            if (formModal.product) {
                // Update
                data.append('_method', 'PUT');
                await api.post(`/products/${formModal.product.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('Product updated successfully!');
            } else {
                // Create
                await api.post('/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('Product created successfully!');
            }

            setFormModal({ isOpen: false, product: null });
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setSaving(false);
        }
    };

    // Delete product
    const handleDelete = async () => {
        try {
            setDeleting(true);
            await api.delete(`/products/${deleteModal.product.id}`);
            toast.success('Product deleted successfully!');
            setDeleteModal({ isOpen: false, product: null });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product');
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
                        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
                        <p className="text-gray-600 mt-1">Manage your product catalog</p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        size="lg"
                        className="flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Product
                    </Button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-soft p-6">
                    <div className="flex-1 relative max-w-md">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        {filteredProducts.length} of {products.length} products
                    </p>
                </div>

                {/* Products Grid */}
                <div className="bg-white rounded-xl shadow-soft overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                            <p className="mt-4 text-gray-500">Loading products...</p>
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date Created
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative h-14 w-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
                                                            {product.image ? (
                                                                <img
                                                                    src={getStorageUrl(product.image)}
                                                                    alt={product.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full">
                                                                    <CubeIcon className="h-7 w-7 text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            {product.name}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-500 max-w-xs truncate">
                                                        {product.description || '—'}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {product.created_at
                                                        ? new Date(product.created_at).toLocaleDateString()
                                                        : '—'}
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
                                                                            onClick={() => openEditModal(product)}
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
                                                                            onClick={() => setDeleteModal({ isOpen: true, product })}
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
                            <CubeIcon className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                            <p className="text-gray-500 mb-4">
                                {search ? 'No products match your search.' : 'No products yet. Create your first product!'}
                            </p>
                            {!search && (
                                <Button onClick={openCreateModal}>
                                    <PlusIcon className="h-5 w-5 mr-2" />
                                    Add Product
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Create / Edit Modal */}
            <Modal
                isOpen={formModal.isOpen}
                onClose={() => setFormModal({ isOpen: false, product: null })}
                title={formModal.product ? 'Edit Product' : 'Add New Product'}
                size="lg"
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setFormModal({ isOpen: false, product: null })}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            isLoading={saving}
                            disabled={saving}
                        >
                            {saving ? 'Saving...' : formModal.product ? 'Update Product' : 'Create Product'}
                        </Button>
                    </>
                }
            >
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="product-name" className="block text-sm font-medium text-gray-700 mb-2">
                            Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="product-name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter product name"
                        />
                    </div>

                    <div>
                        <label htmlFor="product-description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="product-description"
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    <ImageUpload
                        label="Product Image"
                        value={existingImage}
                        onChange={(file) => setProductImage(file)}
                        onRemove={() => {
                            setProductImage(null);
                            setExistingImage(null);
                        }}
                    />
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, product: null })}
                title="Delete Product"
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteModal({ isOpen: false, product: null })}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            isLoading={deleting}
                            disabled={deleting}
                        >
                            {deleting ? 'Deleting...' : 'Delete Product'}
                        </Button>
                    </>
                }
            >
                <div className="text-center sm:text-left">
                    <p className="text-gray-600">
                        Are you sure you want to delete <span className="font-semibold">"{deleteModal.product?.name}"</span>?
                        This action cannot be undone.
                    </p>
                </div>
            </Modal>
        </DashboardLayout>
    );
}

export default withAuth(ProductsIndex);
