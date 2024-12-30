import React from 'react';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { deleteArticle } from '../store/articlesSlice.jsx';

const ArticleCard = ({ article }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteArticle(article.ID))
                    .then(() => {
                        Swal.fire(
                            'Deleted!',
                            'Article has been deleted.',
                            'success'
                        );
                    });
            }
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{article.title}</h2>
            <div className="flex items-center mb-4 text-gray-600">
                <span className="mr-4">{format(new Date(article.date), 'dd MMM yyyy')}</span>
                <span className="mr-4">|</span>
                <span>{article.location}</span>
            </div>
            <p className="text-gray-700 mb-4">{article.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">By {article.author}</span>
                <div className="space-x-2">
                    <button
                        onClick={() => handleEdit(article)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
