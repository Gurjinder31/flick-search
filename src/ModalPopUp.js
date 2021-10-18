import React, { useEffect, useRef, useState } from 'react'

import './ModalPopUp.css'

const ModalPopUp = ({ url, open, setOpen }) => {

    const imgRef = useRef();

    const [dimension, setDimension] = useState({})

    useEffect(() => {
        getImgDetails();
    }, [dimension])


    const getImgDetails = () => {

        setDimension({
            height: imgRef.current.clientHeight,
            width: imgRef.current.clientWidth,
        })
    }


    return (

        <div className="imgDiv">
            <img ref={imgRef} onLoad={getImgDetails} className="Modal-img" src={url} alt="testing" />
            <div className="Modal-cross" onClick={() => setOpen(!open)}>
                x
            </div>
            <div className="img-details mx-auto">
                <div className="fw-bold ">Image height:{dimension.height}</div>
                <div className="fw-bold ps-5">Image Width:{dimension.width}</div>
            </div>
        </div >
    )
}

export default ModalPopUp
