import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import { toast } from "react-hot-toast";


const initialState = {
    loading: false,
    subscribed: null,
    channelSubscribers: [],
    mySubscriptions: [],
}

export const toggleSubscription = createAsyncThunk("toggleSubscription", async (channelId) => {
    try {
        const response = await axiosInstance.post(`/subscriptions/c/${channelId}`)
        return response.data.data.subscribed
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getUserChannelSubscribers = createAsyncThunk("getUserChannelSubscribers", async (channelId) => {
    try {
        const response = await axiosInstance.get(`/subscriptions/c/${channelId}`)
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getSubscribedChannels = createAsyncThunk("getSubscribedChannels", async (subscriberId) => {
    try {
        const response = await axiosInstance.get(`/subscriptions/u/${subscriberId}`)
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