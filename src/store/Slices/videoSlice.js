import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const API_URL = "http://localhost:8000/api/v1"

const initialState = {
    loading: false,
    uploading: false,
    uploaded: false,
    videos: {
        docs: [],
        hasNextPage: false,
    },
    video: null,
    publishToggled: false,
}

export const getAllVideos = createAsyncThunk("getAllVideos", async ({userId, page, limit, sortBy, sortType, query}) => {
    try {
        const url = new URL(`${API_URL}/video`)

        if(userId) url.searchParams.set("userId", userId)
        if(page) url.searchParams.set("page", page)
        if(limit) url.searchParams.set("limit", limit)
        if(query) url.searchParams.set("query", query)
        if(sortBy && sortType){
            url.searchParams.set("sortBy", sortBy)
            url.searchParams.set("sortType", sortType)
        }

        const response = await axios.get(url)
        return response.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const publishAVideo = createAsyncThunk("publishAvideo", async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("videoFile", data.videoFile[0]);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
        const response = await axios.post(`${API_URL}/video`, formData)
        toast.success(response?.data?.message)
        return response.data.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const updateAVideo = createAsyncThunk("updateAvideo", async ({data, videoId}) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("thumbnail", data.thumbnail[0]);

    try {
        const reaponse = await axios.patch(`${API_URL}/video/v/${videoId}`, formData)
        toast.success(reaponse?.data?.message)
        return reaponse.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const deleteAVideo = createAsyncThunk("deleteAvideo", async (videoId) => {
    try {
        const response = await axios.delete(`${API_URL}/video/v/${videoId}`)
        toast.success(response?.data?.message)
        return response.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getVideoById = createAsyncThunk("getVideoById", async ({videoId}) => {
    try {
        const response = await axios.get(`${API_URL}/video/v/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const togglePublishStatus = createAsyncThunk("togglePublishStatus", async (videoId) => {
    try {
        const response = await axios.patch(`${API_URL}/video/toggle/publish/${videoId}`)
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        updateUploadStatus: (state, action) => {
            state.uploading = false
            state.uploaded = false
        },
        makeVideosNull: (state) => {
            state.videos.docs = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllVideos.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false
            state.videos.docs = [...state.videos.docs, ...action.payload.docs]
            state.videos.hasNextPage = action.payload.hasNextPage
        })
        .addCase(getAllVideos.rejected, (state) => {
            state.loading = false
        })
        .addCase(publishAVideo.pending, (state) => {
            state.uploading = true
        })
        .addCase(publishAVideo.fulfilled, (state, action) => {
            state.uploading = false
            state.uploaded = true
        })
        .addCase(publishAVideo.rejected, (state) => {
            state.uploading = false
            state.uploaded = false
        })
        .addCase(updateAVideo.pending, (state) => {
            state.uploading = true
        })
        .addCase(updateAVideo.fulfilled, (state, action) => {
            state.uploading = false
            state.uploaded = true
        })
        .addCase(updateAVideo.rejected, (state) => {
            state.uploading = false
            state.uploaded = false
        })
        .addCase(deleteAVideo.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteAVideo.fulfilled, (state, action) => {
            state.loading = false
        })
        .addCase(deleteAVideo.rejected, (state) => {
            state.loading = false
        })
        .addCase(getVideoById.pending, (state) => {
            state.loading = true
        })
        .addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false
            state.video = action.payload
        })
        .addCase(getVideoById.rejected, (state) => {
            state.loading = false
        })
        .addCase(togglePublishStatus.fulfilled, (state) => {
            state.loading = false
            state.publishToggled = !state.publishToggled
        })
    }
})

export const { updateUploadStatus, makeVideosNull } = videoSlice.actions
export default videoSlice.reducer