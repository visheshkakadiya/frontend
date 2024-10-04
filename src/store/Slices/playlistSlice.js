import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/v1";

const initialState = {
    loading: false,
    playlist: [],
    playlists: [],
}

export const createAPlaylist = createAsyncThunk("createAPlaylist", async ({ name, description }) => {
    try {
        const response = await axios.post(`${API_URL}/playlist`, { name, description })
        if (response.data?.success) {
            toast.success(response?.data?.message)
        }
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const addVideoToPlaylist = createAsyncThunk("addVideoToPlaylist", async ({ playlistId, videoId }) => {
    try {
        const response = await axios.patch(`${API_URL}/playlist/add/${videoId}/${playlistId}`)
        if (response.data?.success) {
            toast.success(response?.data?.message)
        }
        return response.data.data
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const removeVideoFromPlaylist = createAsyncThunk(
    "removeVideoFromPlaylist",
    async (playlistId, videoId) => {
        try {
            const response = await axios.patch(
                `${API_URL}/playlist/remove/${videoId}/${playlistId}`
            );
            if (response.data?.success) {
                toast.success(response.data.message);
            }
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getPlaylistById = createAsyncThunk(
    "getPlaylistById",
    async (playlistId) => {
        try {
            const response = await axios.get(`${API_URL}/playlist/${playlistId}`);
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const getPlaylistsByUser = createAsyncThunk(
    "getPlaylistsByUser",
    async (userId) => {
        try {
            const response = await axios.get(
                `${API_URL}/playlist/user/${userId}`
            );
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const upadtePlaylist = createAsyncThunk(
    "upadtePlaylist",
    async ({ playlistId, name, description }) => {
        try {
            const response = await axios.patch(
                `${API_URL}/playlist/${playlistId}`,
                { name, description }
            );
            if (response.data.success) {
                toast.success(response.data.message);
            }
            return response.data.data;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);

export const deletePlaylist = createAsyncThunk("deletePlaylist", async ({ playlistId }) => {
    try {
        const response = await axios.delete(`${API_URL}/playlist/${playlistId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlaylistsByUser.fulfilled, (state, action) => {
            state.playlists = action.payload;
        });
    },
});

export default playlistSlice.reducer;