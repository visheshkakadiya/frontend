import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaylistById, getPlaylistsByUser } from '../../store/Slices/playlistSlice';
import { Playlist } from '../../components';
import { userChannelProfile } from '../../store/Slices/userSlice';

function PlaylistDetails() {
    const { playlistId } = useParams(); // Extract playlistId from route
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const playlist = useSelector((state) => state.playlist?.playlist); // Details of the selected playlist
    const playlists = useSelector((state) => state.playlist?.playlists); // List of all playlists for the user
    const loading = useSelector((state) => state.playlist.loading); // Loading state
    const userId = useSelector((state) => state.user.profileData?._id); // Current user's ID
    const channel = useSelector((state) => state.auth?.user);

    // Fetch the specific playlist by ID
    useEffect(() => {
        if (playlistId) {
            dispatch(getPlaylistById(playlistId));
        }
    }, [dispatch, playlistId]);

    // Fetch all playlists by the user
    useEffect(() => {
        if (userId) {
            dispatch(getPlaylistsByUser(userId));
        }
    }, [dispatch, userId]);

    //console.log("user ID: ", userId);

    // Debugging: Log playlists and playlistId
    useEffect(() => {
        if (!userId && channel?.username) {
            dispatch(userChannelProfile(channel.username)); // Fetch data using the username
        }
    }, [userId, channel?.username, dispatch]);

    useEffect(() => {
        if (!playlists || playlists.length === 0) {
            if (userId) {
                dispatch(getPlaylistsByUser(userId));
            }
        }
    }, [dispatch, userId, playlists]);

    const playListClick = () => {
        const channelUsername = currentPlaylist?.owner?.username || channel?.username;
        if (channelUsername) {
            navigate(`/channel/${channelUsername}/playlists`);
        } else {
            console.error("Username not available for navigation");
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!playlists || playlists.length === 0) {
        return <div>No playlists found for this user.</div>;
    }

    // Find the current playlist details from the user's playlists
    const currentPlaylist = playlists?.find((p) => p._id === playlistId);

    // Debugging: Log currentPlaylist
    // console.log("Current Playlist:", currentPlaylist);
    // console.log("Playlist:", playlist);
    // console.log("Playlist ID:", playlistId);

    return (
        <div className="p-6 space-y-6">
            {/* Playlist Card */}
            {currentPlaylist ? (
                <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex">
                    {/* Thumbnail */}
                    <div className="relative w-1/3">
                        <img
                            src={currentPlaylist?.firstVideoThumbnail || 'fallback-image.jpg'}
                            alt={currentPlaylist?.name || 'Playlist Thumbnail'}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                            <p className="text-sm bg-purple-500 px-2 py-1 rounded-md inline-block" onClick={playListClick}>Playlist</p>
                            <p className="text-sm mt-1">{currentPlaylist?.totalVideos || 0} videos • {currentPlaylist?.totalViews} views</p>
                        </div>
                    </div>

                    {/* Playlist Info */}
                    <div className="flex-1 p-4">
                        <h3 className="text-xl font-bold text-purple-500">
                            {currentPlaylist?.name || 'Untitled Playlist'}
                        </h3>
                        <p className="text-sm text-gray-400 mt-2">
                            {currentPlaylist?.description || 'No description provided.'}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Created: {new Date(currentPlaylist?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ) : (
                <div>No matching playlist found for this ID.</div>
            )}

            {/* Video List */}
            <div>
                {playlist.videos.map((video) => (
                    <Playlist
                        key={video._id}
                        videoId={video._id}
                        thumbnail={video.thumbnail?.url}
                        avatar={video.owner?.avatar?.url}
                        title={video.title}
                        description={video.description}
                        views={video.views}
                        createdAt={video.createdAt}
                        channelName={video.owner?.username}
                        duration={video.duration}
                    />
                ))}
            </div>
        </div>
    );
}

export default PlaylistDetails;
