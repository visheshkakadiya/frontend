import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/v1";

const initialState = {
    loading: false,
    likeVideos: [],
}

export const toggleVideoLike = createAsyncThunk("toggleVideoLike", async (videoId) => {
    try {
        const response = await axios.post(`${API_URL}/likes/toggle/v/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const toggleTweetLike = createAsyncThunk("toggleTweetLike", async (tweetId) => {
    try {
        const response = await axios.post(`${API_URL}/likes/toggle/t/${tweetId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const toggleCommentLike = createAsyncThunk("toggleCommentLike", async (commentId) => {
    try {
        const response = await axios.post(`${API_URL}/likes/toggle/c/${commentId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getLikedVideos = createAsyncThunk("getLikedVideos", async () => {
    try {
        const response = await axios.get(`${API_URL}/likes/videos`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLikedVideos.pending, (state) => {
            state.loading = true
        })
        .addCase(getLikedVideos.fulfilled, (state, action) => {
            state.loading = false
            state.likeVideos = action.payload
        })
    }
})

export default likeSlice.reducer