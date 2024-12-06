import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getVideoById,
  getAllVideos,
  makeVideosNull,
} from "../store/Slices/videoSlice";
import { getVideoComments, cleanUpComments } from "../store/Slices/commentSlice";
import {
  CommentList,
  Description,
  InfiniteScroll,
  Navbar,
  Spinner,
  Video,
  TweetAndComment,
  VideoSuggestions,
} from "../components";
import { getPlaylistsByUser } from "../store/Slices/playlistSlice";

function VideoDetails() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const video = useSelector((state) => state.video?.video);
  const comments = useSelector((state) => state.comment?.comments);
  const loading = useSelector((state) => state.comment?.loading);
  const totalComments = useSelector((state) => state.comment?.totalComments);
  const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
  const playlistsId = useSelector((state) => state.playlist?.playlists?._id);
  const playlists = useSelector((state) => state.playlist?.playlists);
  const userId = useSelector((state) => state.auth.user?._id);
  const videoNextPage = useSelector((state) => state.video?.hasNextPage);
  const videos = useSelector((state) => state.video?.videos?.docs); // Suggested videos
  const videoLoading = useSelector((state) => state.video?.loading);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (videoId) {
      dispatch(getVideoById({ videoId }));
      dispatch(getVideoComments({ videoId }));
    }

    return () => dispatch(cleanUpComments());
  }, [dispatch, videoId]);

  useEffect(() => {
    dispatch(getAllVideos({ page: 1, limit: 10 }));

    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(getPlaylistsByUser(userId));
    }
  }, [dispatch, userId]);

  const currentPlaylist = playlists?.find((p) => p._id === playlistsId);

  const fetchMoreComments = useCallback(() => {
    if (!loading && hasNextPage) {
      dispatch(getVideoComments({ videoId, page: page + 1 }));
      setPage((prev) => prev + 1);
    }
  }, [loading, dispatch, videoId, page, hasNextPage]);

  const fetchMoreVideos = useCallback(() => {
    if (!videoLoading && videoNextPage) {
      dispatch(getAllVideos({ page: page + 1, limit: 10 }));
      setPage((prev) => prev + 1);
    }
  }, [videoLoading, dispatch, videoNextPage, page]);

  function shuffleArray(array) {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  const shuffledVideos = shuffleArray(videos);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row px-3 sm:px-5 mt-5">
        {/* Main Video Section */}
        <div className="lg:w-2/3 w-full">
          <Video
            src={video?.videoFile?.url}
            poster={video?.thumbnail?.url}
          />
          <Description
            avatar={video?.owner?.avatar.url}
            channelName={video?.owner?.username}
            createdAt={video?.createdAt}
            description={video?.description}
            isSubscribed={video?.owner?.isSubscribed}
            likesCount={video?.likesCount}
            subscribersCount={video?.owner?.subscribersCount}
            title={video?.title}
            views={video?.views}
            key={video?._id}
            isLiked={video?.isLiked}
            videoId={video?._id}
            channelId={video?.owner?._id}
            playlistId={currentPlaylist?._id}
          />
          <div className="text-white font-semibold mt-5">
            {totalComments} Comments
          </div>
          <TweetAndComment comment={true} videoId={video?._id} />
          <InfiniteScroll fetchMore={fetchMoreComments} hasNextPage={hasNextPage}>
            <div className="w-full sm:max-w-4xl">
              {comments?.map((comment) => (
                <CommentList
                  key={comment?._id}
                  avatar={comment?.owner?.avatar?.url}
                  commentId={comment?._id}
                  content={comment?.content}
                  createdAt={comment?.createdAt}
                  fullName={comment?.owner?.fullName}
                  isLiked={comment?.isLiked}
                  likesCount={comment?.likesCount}
                  username={comment?.owner?.username}
                />
              ))}
              {loading && (
                <div className="w-full flex justify-center items-center">
                  <Spinner width={10} />
                </div>
              )}
            </div>
          </InfiniteScroll>
        </div>

        {/* Suggested Videos Section */}
        <div className="lg:w-1/3 w-full lg:pl-5 mt-8 lg:mt-0">
          <h2 className="text-lg font-semibold text-white mb-4">
            Suggested Videos
          </h2>
          <div className="space-y-4">
            {shuffledVideos?.map((video) => (
              <VideoSuggestions
                key={video._id}
                title={video.title}
                thumbnail={video.thumbnail.url}
                duration={video.duration}
                views={video.views}
                channelName={video.owner.username}
                createdAt={video.createdAt}
              />
            ))}

            {videoLoading && (
              <div className="flex justify-center items-center">
                <Spinner width={8} />
              </div>
            )}
            <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={videoNextPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetails;
