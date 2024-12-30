import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles, deleteArticle, createArticle, updateArticle } from '../store/articlesSlice.jsx';
import Swal from 'sweetalert2';
import { format } from 'date-fns';

const Article = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.articles.items);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        date: '',
        author: '',
        location: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const handleCreate = () => {
        setEditingId(null);
        setFormData({
            title: '',
            description: '',
            content: '',
            date: '',
            author: '',
            location: ''
        });
        setIsModalOpen(true);
    };

    const handleEdit = (article) => {
        setEditingId(article.ID);
        setFormData({
            title: article.title,
            description: article.description,
            content: article.content,
            date: article.date.split('T')[0],
            author: article.author,
            location: article.location
        });
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteArticle(id))
                    .then(() => {
                        Swal.fire(
                            'Terhapus!',
                            'Artikel berhasil dihapus.',
                            'success'
                        );
                        dispatch(fetchArticles());
                    });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const action = editingId
            ? updateArticle({ id: editingId, data: formData })
            : createArticle(formData);

        dispatch(action)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: `Artikel berhasil ${editingId ? 'diupdate' : 'ditambahkan'}`
                });
                setIsModalOpen(false);
                dispatch(fetchArticles());
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan!'
                });
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Artikel Bencana</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Tambah Artikel
                    </button>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div
                            key={article.ID}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                                    <span className="text-sm text-gray-500">
                    {format(new Date(article.date), 'dd MMM yyyy')}
                  </span>
                                </div>
                                <p className="text-gray-600 mb-4">{article.description}</p>
                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>{article.author}</span>
                                    <span>{article.location}</span>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleEdit(article)}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(article.ID)}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Form */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                            <h2 className="text-2xl font-bold mb-6">
                                {editingId ? 'Edit Artikel' : 'Tambah Artikel Baru'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Judul
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Deskripsi
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Konten
                                    </label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        rows="5"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Penulis
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full border-gray-300 rounded-md shadow-sm"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Lokasi
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full border-gray-300 rounded-md shadow-sm"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {editingId ? 'Update' : 'Simpan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Article;