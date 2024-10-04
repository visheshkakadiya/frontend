import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/v1";

const initialState = {
    loading: false,
    subscribed: null,
    channelSubscribers: [],
    mySubscriptions: [],
}

export const toggleSubscription = createAsyncThunk("toggleSubscription", async (channelId) => {
    try {
        const response = await axios.post(`${API_URL}/subscriptions/c/${channelId}`)
        return response.data.data.subscribed
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getUserChannelSubscribers = createAsyncThunk("getUserChannelSubscribers", async (channelId) => {
    try {
        const response = await axios.get(`${API_URL}/c/${channelId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getSubscribedChannels = createAsyncThunk("getSubscribedChannels", async (subscriberId) => {
    try {
        const response = await axios.get(`${API_URL}/subscriptions/u/${subscriberId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(toggleSubscription.pending, (state) => {
            state.loading = true
        })
        .addCase(toggleSubscription.fulfilled, (state, action) => {
            state.loading = false
            state.subscribed = action.payload
        })
        .addCase(getUserChannelSubscribers.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserChannelSubscribers.fulfilled, (state, action) => {
            state.loading = false
            state.channelSubscribers = action.payload
        })
        .addCase(getSubscribedChannels.pending, (state) => {
            state.loading = true
        })
        .addCase(getSubscribedChannels.fulfilled, (state, action) => {
            state.loading = false
            state.mySubscriptions = action.payload.filter((subscription) => subscription?.subscribedChannel?.latestVideo)
        })
    }
})

export default subscriptionSlice.reducer