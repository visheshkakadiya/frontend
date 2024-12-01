import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import { toast } from "react-hot-toast";


const initialState = {
    loading: false,
    playlist: [],
    playlists: [],
}

export const createAPlaylist = createAsyncThunk("createAPlaylist", async ({ name, description }) => {
    try {
        const response = await axiosInstance.post(`/playlist`, { name, description })
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
        const response = await axiosInstance.patch(`/playlist/add/${videoId}/${playlistId}`)
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
            const response = await axiosInstance.patch(
                `/playlist/remove/${videoId}/${playlistId}`
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
            const response = await axiosInstance.get(`/playlist/${playlistId}`);
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
            const response = await axiosInstance.get(
                `/playlist/user/${userId}`
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
            const response = await axiosInstance.patch(
                `/playlist/${playlistId}`,
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
        const response = await axiosInstance.delete(`/playlist/${playlistId}`);
        return response.data.data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        makePlaylistNull: (state) => {
            state.playlists = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPlaylistsByUser.fulfilled, (state, action) => {
            state.playlists = action.payload;
        });
        builder.addCase(getPlaylistById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPlaylistById.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload;
        });
        builder.addCase(createAPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.playlists.unshift(action.payload);
        })
        builder.addCase(deletePlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.playlists = state.playlists.filter((playlist) => playlist._id !== action.payload._id);
        })
        builder.addCase(addVideoToPlaylist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(addVideoToPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload;
        })
        builder.addCase(removeVideoFromPlaylist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
            state.loading = false;
            state.playlist = action.payload;
        })
    },
});

export const {makePlaylistNull} = playlistSlice.actions

export default playlistSlice.reducer;