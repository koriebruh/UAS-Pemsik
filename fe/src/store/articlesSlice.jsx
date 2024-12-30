import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
    const response = await axios.get('http://localhost:3000/api/articles');
    return response.data.Data;
});

export const createArticle = createAsyncThunk('articles/createArticle', async (articleData) => {
    const response = await axios.post('http://localhost:3000/api/articles', articleData);
    return response.data;
});

export const updateArticle = createAsyncThunk('articles/updateArticle', async ({ id, data }) => {
    const response = await axios.put(`http://localhost:3000/api/articles/${id}`, data);
    return response.data;
});

export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/articles/${id}`);
    return { id, response: response.data };
});

const articleSlice = createSlice({
    name: 'articles',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default articleSlice.reducer;