import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Header from "../layout/header.jsx";
import axios from "axios";
import FormSection from "../componens/FormSection.jsx";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false); // State untuk visibilitas form
    const [form, setForm] = useState({
        title: '',
        description: '',
        content: '',
        date: '',
        author: '',
        location: ''
    });

    useEffect(() => {
        fetchArticles();
    }, []);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const fetchArticles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/articles');
            setArticles(response.data.Data);
            setLoading(false);
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to fetch articles!'
            });
            setLoading(false);
        }
    };

    const createArticle = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/articles', form, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            Toast.fire({
                icon: 'success',
                title: 'Article created successfully!'
            });
            fetchArticles();
            resetForm();
            setIsFormVisible(false); // Sembunyikan form setelah berhasil membuat artikel
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to create article!'
            });
        }
    };

    const handleDeleteClick = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            backdrop: true,
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/articles/${id}`);
                Toast.fire({
                    icon: 'success',
                    title: 'Article deleted successfully!'
                });
                fetchArticles();
            } catch (error) {
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to delete article!'
                });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const resetForm = () => {
        setForm({
            title: '',
            description: '',
            content: '',
            date: '',
            author: '',
            location: ''
        });
    };

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 drop-shadow-sm">
                        Volcanic Disaster Articles
                    </h1>

                    {/* Tombol untuk menampilkan form */}
                    <div className="text-center mb-8">
                        <button
                            onClick={() => setIsFormVisible(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Tambah Artikel
                        </button>
                    </div>

                    {/* Tampilkan Form jika isFormVisible true */}
                    {isFormVisible && (
                        <FormSection
                            form={form}
                            handleInputChange={handleInputChange}
                            createArticle={createArticle}
                            resetForm={resetForm}
                            onCancel={() => setIsFormVisible(false)} // Fungsi untuk menutup form
                        />

                    )}

                    {/* Articles Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map((article) => (
                                <div key={article.ID}
                                     className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h2>
                                        <div className="flex items-center gap-2 mb-4 text-gray-600">
                                            <span className="text-sm">{article.author}</span>
                                            <span className="text-sm">•</span>
                                            <span
                                                className="text-sm">{new Date(article.date).toLocaleDateString()}</span>
                                        </div>
                                        <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleDeleteClick(article.ID)}
                                                className="flex-1 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => setIsFormVisible(true)}
                                                className="flex-1 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Articles;
