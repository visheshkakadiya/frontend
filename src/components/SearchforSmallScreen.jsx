import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import Input from './Input';
import Button from './Button';

function SearchforSmallScreen({open, setOpenSearch}) {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();

    const search = (data) => {
        const query = data?.query
        navigate(`/search/${query}`)
        setOpenSearch((prev) => !prev)
    }

    return (
        <>
            {open && (
                <div className='fixed bg-black bg-opacity-90 z-50 inset-0 h-screen w-full flex items-start justify-start'>
                    <div className='sm:p-8 p-4 relative w-full'>
                        <div className='flex justify-end'>
                        <FontAwesomeIcon icon={faCircleXmark} 
                            size='2x'
                            className='text-white'
                            onClick={() => setOpenSearch((prev) => !prev)}
                        />                 
                         </div>
                        <form onSubmit={handleSubmit(search)}>
                            <div className='flex flex-row mt-3'>
                                <Input 
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 border border-gray-300 focus:outline-none mt-2 h-9"
                                {...register("query",
                                    {required: true}
                                )}
                                />
                                <Button
                                type="submit"
                                className="px-4 py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 h-9 mt-2"
                                >Search</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
export default SearchforSmallScreen
