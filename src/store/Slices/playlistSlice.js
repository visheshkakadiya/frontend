import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance.js";
import { toast } from "react-hot-toast";


const initialState = {
    loading: false,
    playlist: {videos: []},
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
    async ({playlistId, videoId}) => {
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
    async ({ playlistId, data}) => {

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);

        try {
            const response = await axiosInstance.patch(
                `/playlist/${playlistId}`,
                formData
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

export const deletePlaylist = createAsyncThunk("deletePlaylist", async (playlistId) => {
    try {
        const response = await axiosInstance.delete(`/playlist/${playlistId}`);
        toast.success(response?.data?.message)
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
        builder.addCase(upadtePlaylist.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(upadtePlaylist.fulfilled, (state, action) => {
            state.loading = false;
        
            // Find the playlist to update in the array
            const playlistIndex = state.playlists.findIndex(
                (playlist) => playlist._id === action.payload._id
            );
        
            if (playlistIndex !== -1) {
                // Merge existing playlist details with updated data
                state.playlists[playlistIndex] = {
                    ...state.playlists[playlistIndex],
                    ...action.payload,
                };
            }
        
            // Update the currently loaded playlist if it's the one being edited
            if (state.playlist._id === action.payload._id) {
                state.playlist = {
                    ...state.playlist,
                    ...action.payload,
                };
            }
        });
        
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