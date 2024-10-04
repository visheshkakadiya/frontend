import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/authSlice.js'
import videoSliceReducer from './Slices/videoSlice.js'
import commentSliceReducer from './Slices/commentSlice.js'
import dashboard from "./Slices/dashboard.js";
import likeSlice from "./Slices/likeSlice.js";
import playlistSlice from "./Slices/playlistSlice.js";
import subscriptionSlice from "./Slices/subscriptionSlice.js";
import tweetSlice from "./Slices/tweetSlice.js";
import userSliceReducer from "./Slices/userSlice.js";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        video: videoSliceReducer,
        comment: commentSliceReducer,
        dashboard: dashboard,
        like: likeSlice,
        playlist: playlistSlice,
        subscription: subscriptionSlice,
        tweet: tweetSlice,
        user: userSliceReducer
    }
})

export default store;