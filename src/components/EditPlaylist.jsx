import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { upadtePlaylist } from '../store/Slices/playlistSlice';
import { Input2, Button } from './index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

function EditPlaylist({ playlistId, name, description, onClose }) {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        setValue('name', name);
        setValue('description', description);
    }, [setValue, name, description]);

    const updatePlayList = (data) => {
        dispatch(upadtePlaylist({ playlistId, data }));
        onClose(); // Close the popup after updating
    };

    const reset = (e) => {
        e.preventDefault();
        setValue('name', name);
        setValue('description', description);
    };

    return (
        <div className="w-full text-white flex justify-center items-center mt-5">
            <div className="bg-gray-800 p-5 border rounded shadow-lg w-full max-w-md relative">
                {/* Close Icon */}
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-white absolute top-2 right-2 cursor-pointer"
                    onClick={onClose}
                />
                {/* Header */}
                <h2 className="text-lg font-bold mb-4">
                    Playlist Information
                    <p className="font-light text-xs">Update your playlist details here.</p>
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(updatePlayList)} className="space-y-4">
                    <div className="flex flex-col">
                        <Input2
                            label="Playlist Name"
                            type="text"
                            className="rounded"
                            {...register('name', {
                                required: 'Name is required',
                            })}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">{errors.name?.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Input2
                            label="Description"
                            type="text"
                            className="rounded"
                            {...register('description', {
                                required: 'Description is required',
                            })}
                        />
                        {errors.description && (
                            <span className="text-sm text-red-500">{errors.description?.message}</span>
                        )}
                    </div>
                    <div className="flex justify-between mt-4">
                        <Button
                            onClick={(e) => reset(e)}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            className="bg-purple-500 text-white px-4 py-2 rounded"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPlaylist;
