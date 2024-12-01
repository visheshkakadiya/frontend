import React, { useEffect } from "react";
import { ChannelHeader, ChannelNavigate, Spinner } from "../components";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userChannelProfile } from "../store/Slices/userSlice"; // import the thunk

function EditChannel() {
  const dispatch = useDispatch();
  const channel = useSelector((state) => state.auth?.user);
  const loading = useSelector((state) => state.auth?.isLoading);
  const user = useSelector((state) => state.user?.profileData);

  // Fetch profile data on mount if it's null
  useEffect(() => {
    if (!user && channel?.username) {
      dispatch(userChannelProfile(channel.username)); // Fetch data using the username
    }
  }, [user, channel?.username, dispatch]);

  window.scrollTo(0, 0);

  return (
    <>
      {loading && (
        <div className="w-full fixed top-20 flex justify-center z-20">
          <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
            <Spinner />
            <span className="text-md font-bold text-white">wait dude...</span>
          </div>
        </div>
      )}

      {channel && (
        <ChannelHeader
          username={channel?.username}
          coverImage={channel?.coverImage?.url}
          avatar={channel?.avatar?.url}
          subscribedCount={channel?.channelsSubscribedToCount}
          fullName={channel?.fullName}
          subscribersCount={channel?.subcribersCount}
          isSubscribed={channel?.isSubscribed}
          channelId={channel?._id}
          edit={true}
        />
      )}

      <ChannelNavigate edit={true} />
      <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
        <Outlet />
      </div>
    </>
  );
}

export default EditChannel;
