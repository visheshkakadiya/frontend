import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../helper/axiosInstance.js'
import { toast } from 'react-hot-toast'
import { BASE_URL } from '../../constants.js'


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
        const url = new URL(`${BASE_URL}/video`)

        if(userId) url.searchParams.set("userId", userId)
        if(page) url.searchParams.set("page", page)
        if(limit) url.searchParams.set("limit", limit)
        if(query) url.searchParams.set("query", query)
        if(sortBy && sortType){
            url.searchParams.set("sortBy", sortBy)
            url.searchParams.set("sortType", sortType)
        }

        const response = await axiosInstance.get(url)
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
        const response = await axiosInstance.post(`/video`, formData)
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
        const reaponse = await axiosInstance.patch(`/video/v/${videoId}`, formData)
        toast.success(reaponse?.data?.message)
        return reaponse.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const deleteAVideo = createAsyncThunk("deleteAvideo", async (videoId) => {
    try {
        const response = await axiosInstance.delete(`/video/v/${videoId}`)
        toast.success(response?.data?.message)
        return response.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const getVideoById = createAsyncThunk("getVideoById", async ({videoId}) => {
    try {
        const response = await axiosInstance.get(`/video/v/${videoId}`)
        return response.data.data
    } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong.")
        throw error
    }
})

export const togglePublishStatus = createAsyncThunk("togglePublishStatus", async (videoId) => {
    try {
        const response = await axiosInstance.patch(`/video/toggle/publish/${videoId}`)
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
        builder.addCase(getAllVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos.docs = [...state.videos.docs, ...action.payload.docs];
            state.videos.hasNextPage = action.payload.hasNextPage;
        })
        builder.addCase(getAllVideos.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(publishAVideo.pending, (state) => {
            state.uploading = true
        })
        builder.addCase(publishAVideo.fulfilled, (state, action) => {
            state.uploading = false
            state.uploaded = true
        })
        builder.addCase(publishAVideo.rejected, (state) => {
            state.uploading = false
            state.uploaded = false
        })
        builder.addCase(updateAVideo.pending, (state) => {
            state.uploading = true
        })
        builder.addCase(updateAVideo.fulfilled, (state, action) => {
            state.uploading = false
            state.uploaded = true
        })
        builder.addCase(updateAVideo.rejected, (state) => {
            state.uploading = false
            state.uploaded = false
        })
        builder.addCase(deleteAVideo.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteAVideo.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteAVideo.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(getVideoById.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getVideoById.fulfilled, (state, action) => {
            state.loading = false
            state.video = action.payload
        })
        builder.addCase(getVideoById.rejected, (state) => {
            state.loading = false
        })
        builder.addCase(togglePublishStatus.fulfilled, (state) => {
            state.loading = false
            state.publishToggled = !state.publishToggled
        })
    }
})

export const { updateUploadStatus, makeVideosNull } = videoSlice.actions
export default videoSlice.reducer