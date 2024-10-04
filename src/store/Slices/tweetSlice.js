import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/v1";

const initialState = {
    loading: false,
    tweets: [],
}

export const createTweet = createAsyncThunk("createTweet", async (content) => {
    try {
        const response = await axios.post(`${API_URL}/tweet`, {content})
        toast.success(response.data?.message)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const editTweet = createAsyncThunk("editTweet", async ({content, tweetId}) => {
    try {
        const response = await axios.put(`${API_URL}/tweet/${tweetId}`, {content})
        toast.success(response.data?.message)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const deleteTweet = createAsyncThunk("deleteTweet", async (tweetId) => {
    try {
        const response = await axios.delete(`${API_URL}/tweet/${tweetId}`)
        toast.success(response.data?.message)
        return response.data.data.tweetId
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getUserTweets = createAsyncThunk("getUserTweets", async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/tweet/user/${userId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const tweetSlice = createSlice({
    name: "tweet",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserTweets.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserTweets.fulfilled, (state, action) => {
            state.loading = false
            state.tweets = action.payload
        })
        .addCase(createTweet.fulfilled, (state, action) => {
            state.loading = false
            state.tweets.unshift(action.payload)
        })
        .addCase(deleteTweet.fulfilled, (state, action) => {
            state.loading = false
            state.tweets = state.tweets.filter((tweet) => tweet._id !== action.payload)
        })
    }
})

export default tweetSlice.reducer