import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { Controller } from 'react-hook-form';

function ImagePreview({ control, name, defaultValue = "", className, label, showIcon = false, image }) {
    const [preview, setPreview] = useState(null);

    const handlePreview = (e) => {
        const files = e.target.files
        setPreview(URL.createObjectURL(files[0]));
        return files
    };

    return (
        <div className='w-full'>
            <label htmlFor={name} className='cursor-pointer relative flex flex-col justify-center items-start'>
                {label && (
                    <span className='inline-block mb-2 pl-1'>
                        {label}
                    </span>
                )}

                <img src={preview || image} className={className} />

                {showIcon && (
                    <div className="absolute inset-0 flex justify-center items-center">
                        <FontAwesomeIcon
                            icon={faCamera}
                            className="text-gray-500 hover:text-purple-500"
                            size="1x" // Adjust as needed
                        />
                    </div>
                )}

                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    render={({ field: { onChange } }) => (
                        <input
                            type='file'
                            id={name} // Link input with label using this ID
                            className='hidden'
                            accept='image/*'
                            onChange={(e) => {
                               onChange(handlePreview(e))
                            }}
                        />
                    )}
                    rules={{ required: `${name} is required` }}
                />
            </label>
        </div>
    );
}

export default ImagePreview;
