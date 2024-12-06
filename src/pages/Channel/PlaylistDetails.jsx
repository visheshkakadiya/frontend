import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePlaylist, getPlaylistById, getPlaylistsByUser } from '../../store/Slices/playlistSlice';
import { Playlist, EditPlaylist, Spinner, NoVideosFound } from '../../components';
import { userChannelProfile } from '../../store/Slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function PlaylistDetails() {
    const { playlistId } = useParams(); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const playlist = useSelector((state) => state.playlist?.playlist); 
    const playlists = useSelector((state) => state.playlist?.playlists); 
    const loading = useSelector((state) => state.playlist.loading); 
    const userId = useSelector((state) => state.user.profileData?._id); 
    const authId = useSelector((state) => state.auth.user?._id);
    const channel = useSelector((state) => state.auth?.user);
    const [openPopUp, setOpenPopUp] = useState({
        isopen: false,
        editing: false,
    });

    useEffect(() => {
        if (playlistId) {
            dispatch(getPlaylistById(playlistId));
        }
    }, [dispatch, playlistId]);

    useEffect(() => {
        if (userId) {
            dispatch(getPlaylistsByUser(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (userId) {
            dispatch(getPlaylistsByUser(userId)); // Refetch playlists for the user
        }
    }, [dispatch, userId])

    useEffect(() => {
        if (!userId && channel?.username) {
            dispatch(userChannelProfile(channel.username));
        }
    }, [userId, channel?.username, dispatch]);

    const handlePopUp = () => {
        setOpenPopUp((prevstate) => ({
            ...prevstate,
            isopen: !prevstate.isopen,
        }));
    };

    const handleDelete = () => {
        dispatch(deletePlaylist(playlistId));
        const channelUsername = currentPlaylist?.owner?.username || channel?.username;
        if (channelUsername) {
            navigate(`/channel/${channelUsername}/playlists`);
        }
    };

    const playListClick = () => {
        const channelUsername = currentPlaylist?.owner?.username || channel?.username;
        if (channelUsername) {
            navigate(`/channel/${channelUsername}/playlists`);
        } else {
            console.error("Username not available for navigation");
        }
    };

    if (loading) {
        return <Spinner />;
    }

    if (!playlists || playlists.length === 0) {
        return <div>No playlists found for this user.</div>;
    }

    const currentPlaylist = playlists?.find((p) => p._id === playlistId);

    return (
        <div className="p-6 space-y-6">
            {currentPlaylist ? (
                <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden flex relative">
                    {authId === userId && (
                        <>
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                className="text-white cursor-pointer absolute top-2 right-2"
                                onClick={handlePopUp}
                            />
                            {openPopUp.isopen && (
                                <div className="absolute right-5 mt-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg p-2 z-10">
                                    <ul>
                                        <li
                                            className="hover:bg-gray-700 px-4 py-2 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenPopUp((prevstate) => ({
                                                    ...prevstate,
                                                    editing: !prevstate.editing,
                                                }));
                                            }}
                                        >
                                            Edit
                                        </li>
                                        <li
                                            className="hover:bg-red-600 px-4 py-2 cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete();
                                            }}
                                        >
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                    {openPopUp.editing && (
                        <EditPlaylist
                            playlistId={playlistId}
                            name={currentPlaylist?.name}
                            description={currentPlaylist?.description}
                            onClose={() =>
                                setOpenPopUp((prevstate) => ({
                                    ...prevstate,
                                    editing: false,
                                }))
                            }
                        />
                    )}

                    <div className="relative w-1/3">
                        <img
                            src={currentPlaylist?.firstVideoThumbnail || 'fallback-image.jpg'}
                            alt={currentPlaylist?.name || 'Playlist Thumbnail'}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
                            <p
                                className="text-sm bg-purple-500 px-2 py-1 rounded-md inline-block"
                                onClick={playListClick}
                            >
                                Playlist
                            </p>
                            <p className="text-sm mt-1">
                                {currentPlaylist?.totalVideos || 0} videos • {currentPlaylist?.totalViews} views
                            </p>
                        </div>
                    </div>

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

            <div>
                {playlist?.videos?.length > 0 ? (
                    playlist.videos.map((video, index) => (
                        <Playlist
                            key={video._id || `fallback-key-${index}`}
                            videoId={video?._id}
                            playlistId={playlistId}
                            thumbnail={video?.thumbnail?.url}
                            avatar={video?.owner?.avatar?.url}
                            title={video?.title}
                            description={video?.description}
                            views={video?.views}
                            createdAt={video?.createdAt}
                            channelName={video?.owner?.username}
                            duration={video?.duration}
                        />
                    ))
                ) : (
                    <NoVideosFound />
                )}
            </div>
        </div>
    );
}

export default PlaylistDetails;
