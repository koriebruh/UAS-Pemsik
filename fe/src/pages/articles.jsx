import React, { useEffect, useState } from 'react';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(null);
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

    const fetchArticles = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/articles');
            const data = await response.json();
            setArticles(data.Data);
            setLoading(false);
        } catch (error) {
            alert('Failed to fetch articles!');
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
            alert('Article created successfully!');
            fetchArticles();
            resetForm();
        } catch (error) {
            alert('Failed to create article!');
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
            alert('Article updated successfully!');
            fetchArticles();
            resetForm();
        } catch (error) {
            alert('Failed to update article!');
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedArticleId(id);
        setShowDeleteDialog(true);
    };

    const confirmDelete = async () => {
        try {
            await fetch(`http://localhost:3000/api/articles/${selectedArticleId}`, {
                method: 'DELETE',
            });
            alert('Article deleted successfully!');
            fetchArticles();
            setShowDeleteDialog(false);
        } catch (error) {
            alert('Failed to delete the article!');
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Volcanic Disaster Articles
                </h1>

                {/* Form Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Create New Article</h2>
                    <form onSubmit={createArticle} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                            <input
                                type="text"
                                name="author"
                                placeholder="Author"
                                value={form.author}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={form.location}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none h-24"
                            required
                        />
                        <textarea
                            name="content"
                            placeholder="Content"
                            value={form.content}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none h-32"
                            required
                        />
                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                            >
                                Create Article
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            >
                                Reset Form
                            </button>
                        </div>
                    </form>
                </div>

                {/* Articles Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <div key={article.ID} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                                    <p className="text-sm text-gray-500 mb-4">
                                        By {article.author} • {new Date(article.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-2">
                                        <span className="font-semibold">Location:</span> {article.location}
                                    </p>
                                    <p className="text-sm text-gray-700 mb-4">{article.description}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleDeleteClick(article.ID)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => updateArticle(article.ID)}
                                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
                            <p className="text-gray-600 mb-4">
                                Are you sure you want to delete this article? This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowDeleteDialog(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;