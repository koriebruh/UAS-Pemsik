import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks
export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async () => {
        const response = await axios.get('http://localhost:3000/api/articles');
        return response.data.Data;
    }
);

export const createArticle = createAsyncThunk(
    'articles/createArticle',
    async (articleData) => {
        const response = await axios.post('http://localhost:3000/api/articles', articleData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
);

export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async ({ id, articleData }) => {
        const response = await axios.put(`http://localhost:3000/api/articles/${id}`, articleData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
);

export const deleteArticle = createAsyncThunk(
    'articles/deleteArticle',
    async (id) => {
        await axios.delete(`http://localhost:3000/api/articles/${id}`);
        return id;
    }
);

const initialState = {
    articles: [],
    loading: false,
    error: null,
    isFormVisible: false,
    editingArticleId: null,
    form: {
        title: '',
        description: '',
        content: '',
        date: '',
        author: '',
        location: '',
        link_img: '',
    }
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setFormVisibility: (state, action) => {
            state.isFormVisible = action.payload;
        },
        setEditingArticleId: (state, action) => {
            state.editingArticleId = action.payload;
        },
        setForm: (state, action) => {
            state.form = action.payload;
        },
        resetForm: (state) => {
            state.form = initialState.form;
            state.editingArticleId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch articles
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Create article
            .addCase(createArticle.fulfilled, (state) => {
                state.isFormVisible = false;
            })
            // Update article
            .addCase(updateArticle.fulfilled, (state) => {
                state.isFormVisible = false;
                state.editingArticleId = null;
            })
            // Delete article
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.articles = state.articles.filter(article => article.ID !== action.payload);
            });
    },
});

export const {
    setFormVisibility,
    setEditingArticleId,
    setForm,
    resetForm
} = articlesSlice.actions;

export default articlesSlice.reducer;