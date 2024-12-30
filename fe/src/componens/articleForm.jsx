import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createArticle } from '../store/articlesSlice.jsx';
import Swal from 'sweetalert2';

const ArticleForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        date: '',
        author: '',
        location: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createArticle(formData))
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Article created successfully'
                });
                setFormData({
                    title: '',
                    description: '',
                    content: '',
                    date: '',
                    author: '',
                    location: ''
                });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Article</h2>
            <div className="grid grid-cols-1 gap-6">
                <input
                    type="text"
                    placeholder="Title"
                    className="border p-2 rounded"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    className="border p-2 rounded"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <textarea
                    placeholder="Content"
                    className="border p-2 rounded h-32"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Author"
                    className="border p-2 rounded"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="border p-2 rounded"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add Article
                </button>
            </div>
        </form>
    );
};
