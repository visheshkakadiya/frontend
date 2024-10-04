import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/v1";

const initialState = {
    loading: false,
    channelStats: null,
    channelVideos: [],
}

export const getChannelStats = createAsyncThunk("getChannelStats", async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/stats`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error 
    }
})

export const getChannelVideos = createAsyncThunk("getChannelVideos", async () => {
    try {
        const response = await axios.get(`${API_URL}/dashboard/videos`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChannelStats.pending, (state) => {
            state.loading = true
        })
        .addCase(getChannelStats.fulfilled, (state, action) => {
            state.loading = false
            state.channelStats = action.payload
        })
        .addCase(getChannelVideos.pending, (state) => {
            state.loading = true
        })
        .addCase(getChannelVideos.fulfilled, (state, action) => {
            state.loading = false
            state.channelVideos = action.payload
        })
    }
})

export default dashboardSlice.reducer