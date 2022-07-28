import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteLink, editLink } from '../../redux/Actions/LinkAction'
import MediaEmbed from '../MediaEmbed/MediaEmbed'

export default function ModalAddNewHeader() {

    const { loading, linkEdit } = useSelector(state => state.ModalReducer)
    const dispatch = useDispatch()
    const [modalInput, setModalInput] = useState()
    const [selectedImage, setSelectedImage] = useState(null)
    const [isHide, setIsHide] = useState()
    const formData = useRef(null)

    useEffect(() => {
        setIsHide(linkEdit?.isHide)
    }, [linkEdit])

    const handleSubmit = () => {
        let newLink = new FormData(formData.current)
        if (selectedImage !== null) {
            newLink.append('image', selectedImage)
        }
        console.log(linkEdit.id)
        dispatch(editLink(newLink, linkEdit.id))
    }

    const renderInput = () => {
        if (linkEdit.isHeader) {
            return <form ref={formData} className="input-main-wrap overflow-hidden rounded-sm w-full">
                <input defaultValue={linkEdit.title} type="text" name="title" placeholder="Title" className="bl-input w-full p-4 text-sm font-normal font-inter tracking-wider placeholder-grey hover:bg-bl-bg-grey focus:bg-white" />
            </form>
        } else {
            return <form ref={formData} className="w-full flex justify-between flex-col">
                <div className="input-main-wrap overflow-hidden	rounded-sm w-full">
                    <input defaultValue={linkEdit.title} type="text" name="title" placeholder="Title" className="bl-input w-full p-4 text-sm font-normal font-inter tracking-wider placeholder-grey hover:bg-bl-bg-grey focus:bg-white" />
                </div>
                <div className="input-main-wrap overflow-hidden	rounded-sm w-full my-2">
                    <input defaultValue={linkEdit.url} type="text" name="url" placeholder="URL" className="bl-input w-full p-4 text-sm font-normal font-inter tracking-wider placeholder-grey hover:bg-bl-bg-grey focus:bg-white" />
                </div>
            </form>
        }
    }

    return (
        <div>
            <div className='flex mt-8 w-full justify-between'>
                {renderInput()}
                {linkEdit.isPlugin ?
                    <div className='ml-6 flex-shrink-0 relative'>
                        <img src={linkEdit.imgSrc} style={{ width: '90px', height: '90px' }} alt={linkEdit.plugInName} />
                    </div> : ''}
                {!linkEdit.isHeader && !linkEdit.isPlugin ?
                    <div className='ml-6 flex-shrink-0 relative'>
                        <label htmlFor='img-input' className={`${selectedImage === null && linkEdit.image === null ? 'block' : 'hidden'} link-thumb-img-upload relative flex justify-center items-center rounded-sm cursor-pointer xs:mx-auto img-upload-br`}>
                            <div className="text-gray-400 font-inter text-xs text-center mt-2">
                                Insert
                                <p>Picture</p>
                            </div>
                        </label>
                        <input className='hidden' id='img-input' type='file' name='myImage' onChange={(e) => {
                            setSelectedImage(e.target.files[0]);
                        }} />
                        <svg onClick={() => { setSelectedImage(null) }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${selectedImage === null ? 'hidden' : 'block'} absolute img-close-btn cursor-pointer`}><circle cx="12" cy="12" r="11" fill="#0D0C22" stroke="white" strokeWidth="2"></circle> <g clipPath="url(#clip0)"><path d="M15.7766 8.21582L8.86487 15.1275" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M15.7823 15.1347L8.86487 8.21582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></g> <defs><clipPath id="clip0"><rect width="10.3784" height="10.3784" fill="white" transform="translate(7.13513 6.48633)"></rect></clipPath></defs></svg>
                        <img className={`${selectedImage === null && linkEdit.image === null ? 'hidden' : 'block'} link-thumb-img-upload`} alt="Not found" src={selectedImage === null ? linkEdit.image : window.URL.createObjectURL(new Blob([selectedImage], { type: "application/zip" }))} />
                    </div> : ''
                }
            </div>

            {linkEdit.isPlugin ? <MediaEmbed name={linkEdit.plugInName} url={linkEdit.link} hide={false} isAnimated={false} /> : ''}

            <div className="flex justify-between w-full mt-8">
                <div className="text-sm font-inter font-normal cursor-pointer text-red-500" onClick={() => {
                    dispatch(deleteLink(linkEdit.id))
                }}>
                    Delete
                </div>
                <div className="flex">
                    <span htmlFor={linkEdit?.id} className="text-14 font-inter font-normal cursor-pointer text-gray-500 mr-2">Hide</span>
                    <label id={linkEdit?.id} className="bl-toggle-btn relative inline-block ring-opacity-0">
                        <input type="checkbox" name='checkbox' className="bl-toggle-input" checked={isHide || false} onChange={() => {
                            setIsHide(!isHide)
                        }} />
                        <span className="bl-toggle-slider absolute cursor-pointer">
                        </span>
                    </label>
                </div>
            </div>

            <div className='absolute left-0 bottom-0 w-full'>
                <button onClick={() => { handleSubmit() }} className="button-primary font-bold text-white flex justify-center items-center w-full uppercase  btn-h-48 mt-8 tracking-wider">
                    <span className={`${loading ? 'hidden' : 'block'}`}>Save</span>
                    <span className={`bl-circle-loader absolute ${!loading ? 'hidden' : 'block'}`}></span>
                </button>
            </div>
        </div>

    )
}
