import axios from "axios";
import { toast } from "react-toastify";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:8000/api/v1";

export const registerUser = createAsyncThunk("register", async (data) => {
    const formData = new FormData();
    formData.append("avatar", data.avatar[0]);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
    }

    try {
        const response = await axios.post(`${API_URL}/users/register`, formData);
        toast.success(response.data.message); // Notify user of success
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed.");
        throw error;
    }
});

export const userLogin = createAsyncThunk("login", async (data) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, data);
        return response.data.data.user;
    } catch (error) {
        toast.error(error?.response?.data?.error);
        throw error;
    }
});

export const userLogout = createAsyncThunk("logout", async () => {
    try {
        const response = await axios.post(`${API_URL}/users/logout`);
        toast.success(response.data.message);
        return response.data.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Logout failed.");
        throw new Error(error.response?.data?.message || "Logout failed.");
    }
});

export const refreshAccessToken = createAsyncThunk(
    "refreshAccessToken",
    async (data) => {
        try {
            const response = await axios.post(`${API_URL}/users/refresh-token`, data);
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to refresh token.");
            throw new Error(
                error.response?.data?.message || "Failed to refresh token."
            );
        }
    }
);

export const changeCurrentPassword = createAsyncThunk(
    "changeCurrentPassword",
    async (data) => {
        try {
            const response = await axios.post(
                `${API_URL}/users/change-password`,
                data
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to change password."
            );
            throw new Error(
                error.response?.data?.message || "Failed to change password."
            );
        }
    }
);

export const updateAccountDetails = createAsyncThunk(
    "user/updateAccountDetails",
    async (data) => {
        try {
            const response = await axios.patch(
                `${API_URL}/users/update-user`,
                data
            );
            toast.success(response.data.message);
            return response.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update account details."
            );
            throw new Error(
                error.response?.data?.message || "Failed to update account details."
            );
        }
    }
);

export const getCurrentUser = createAsyncThunk("getCurrentUser", async () => {
    const response = await axios.get(`${API_URL}/users/current-user`);
    return response.data.data;
});

// Update Avatar
export const updateUserAvatar = createAsyncThunk(
    "updateAvatar",
    async (avatar) => {
        try {
            const response = await axios.patch(
                `${API_URL}/users/update-avatar`,
                avatar
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update avatar.");
            throw new Error(
                error.response?.data?.message || "Failed to update avatar."
            );
        }
    }
);

// Update Cover Image
export const updateUserCoverImage = createAsyncThunk(
    "updateCoverImage",
    async (coverImage) => {
        try {
            const response = await axios.patch(
                `${API_URL}/users/update-coverImg`,
                coverImage
            );
            toast.success(response.data.message);
            return response.data.data;
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update cover image."
            );
            throw new Error(
                error.response?.data?.message || "Failed to update cover image."
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: false,
        accessToken: null,
        refreshToken: null,
        isLoading: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(userLogin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(userLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.status = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
          })
          .addCase(userLogin.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(userLogout.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(userLogout.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.status = false;
            state.accessToken = null;
            state.refreshToken = null;
          })
          .addCase(userLogout.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
            state.status = false;
            state.error = null;
          })
          .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = true;
            state.user = action.payload;
          })
          .addCase(getCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = false;
            state.error = action.error.message;
          })
          .addCase(refreshAccessToken.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(refreshAccessToken.fulfilled, (state, action) => {
            state.isLoading = false;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
          })
          .addCase(refreshAccessToken.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(changeCurrentPassword.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(changeCurrentPassword.fulfilled, (state) => {
            state.isLoading = false;
          })
          .addCase(changeCurrentPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(updateAccountDetails.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(updateAccountDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
          })
          .addCase(updateAccountDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(updateUserAvatar.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(updateUserAvatar.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.avatar = action.payload.avatar;
          })
          .addCase(updateUserAvatar.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
          .addCase(updateUserCoverImage.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(updateUserCoverImage.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user.coverImage = action.payload.coverImage;
          })
          .addCase(updateUserCoverImage.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
          })
    }
})

export default authSlice.reducer;