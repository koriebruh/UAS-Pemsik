import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
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
            const response = await fetch('http://localhost:3000/api/articles');
            const data = await response.json();
            setArticles(data.Data);
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
            const response = await fetch('http://localhost:3000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            Toast.fire({
                icon: 'success',
                title: 'Article created successfully!'
            });
            fetchArticles();
            resetForm();
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to create article!'
            });
        }
    };

    const updateArticle = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            Toast.fire({
                icon: 'success',
                title: 'Article updated successfully!'
            });
            fetchArticles();
            resetForm();
        } catch (error) {
            Toast.fire({
                icon: 'error',
                title: 'Failed to update article!'
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
            showClass: {
                popup: 'animate__animated animate__fadeIn'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOut'
            }
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:3000/api/articles/${id}`, {
                    method: 'DELETE',
                });
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 drop-shadow-sm">
                    Volcanic Disaster Articles
                </h1>

                {/* Form Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transform transition-all hover:shadow-xl">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-2">Create New Article</h2>
                    <form onSubmit={createArticle} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter article title"
                                    value={form.title}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter author name"
                                    value={form.author}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Enter location"
                                    value={form.location}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                placeholder="Enter article description"
                                value={form.description}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors h-24 resize-none"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                name="content"
                                placeholder="Enter article content"
                                value={form.content}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors h-32 resize-none"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
                            >
                                Create Article
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>

                {/* Articles Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div key={article.ID} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h2>
                                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span className="text-sm">{article.author}</span>
                                        <span className="text-sm">•</span>
                                        <span className="text-sm">{new Date(article.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="text-sm">{article.location}</span>
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
                                            onClick={() => updateArticle(article.ID)}
                                            className="flex-1 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;