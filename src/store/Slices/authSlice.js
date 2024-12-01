import axiosInstance from "../../helper/axiosInstance.js";
import { toast } from "react-hot-toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


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
    const response = await axiosInstance.post(`/users/register`, formData);
    toast.success(response.data.message); // Notify user of success
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Registration failed.");
    throw error;
  }
});

export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post(`/users/login`, data);
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.error || "Login failed.");
    throw error;
  }
});

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post(`/users/logout`);
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
      const response = await axiosInstance.post(`/users/refresh-token`, data);
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
      const response = await axiosInstance.post(
        `/users/change-password`,
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
      const response = await axiosInstance.patch(
        `/users/update-user`,
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
  const response = await axiosInstance.get(`/users/current-user`);
  return response.data.data;
});

// Update Avatar
export const updateUserAvatar = createAsyncThunk(
  "updateAvatar",
  async (avatar) => {
    try {
      const response = await axiosInstance.patch(
        `/users/update-avatar`,
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
      const response = await axiosInstance.patch(
        `/users/update-coverImg`,
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
    isLoading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
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
        state.user = action.payload;
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
        state.user = action.payload;
      })
      .addCase(updateUserCoverImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
})

export default authSlice.reducer;