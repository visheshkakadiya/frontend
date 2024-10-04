import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = "http://localhost:8000/api/v1"

const initialState = {
    loading: false,
    comments: [],
    totalComments: null,
    hasNextPage: false,
}

export const createComment = createAsyncThunk("createComment", async ({videoId, content}) => {
    try {
        const response = await axios.post(`${API_URL}/comment/${videoId}`, {content})
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const editAComment = createAsyncThunk("editComment", async ({commentId, content}) => {
    try {
        const response = await axios.patch(`${API_URL}/comment/c/${commentId}`, {content})
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const deleteAComment = createAsyncThunk("deleteComment", async (commentId) => {
    try {
        const response = await axios.delete(`${API_URL}/comment/c/${commentId}`)
        toast.success(response.data.message)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getVideoComments = createAsyncThunk("getVideoComments", async ({videoId, page, limit}) => {

    const url = new URL(`${API_URL}/comment/${videoId}`)
    if(page) url.searchParams.set("page", page)
    if(limit) url.searchParams.set("limit", limit)

    try {
        const response = await axios.get(url)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        cleanUpComments: (state) => {
            state.comments = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideoComments.pending, (state) => {
                state.loading = true
            })
            .addCase(getVideoComments.fulfilled, (state, action) => {
                state.loading = false
                state.comments = action.payload.docs
                state.totalComments = action.payload.totalDocs
                state.hasNextPage = action.payload.hasNextPage
            })
            .addCase(getVideoComments.rejected, (state) => {
                state.loading = false
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false
                state.comments.unshift(action.payload)
                state.totalComments++
            })
            .addCase(deleteAComment.fulfilled, (state, action) => {
                state.loading = false
                state.comments = state.comments.filter((comment) => comment._id !== action.payload.commentId)
                state.totalComments--
            })
    }
})

export const {cleanUpComments} = commentSlice.actions
export default commentSlice.reducer