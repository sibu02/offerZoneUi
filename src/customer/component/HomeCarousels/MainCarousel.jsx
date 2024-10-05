import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import productImages from './Data';

const MainCarousel = () => {
    const items = productImages.map((img)=>{
        return <img className='cursor-pointer' role='presentation' alt='' src={img.url}/>
    })
    return (
        <AliceCarousel
            items={items}
            autoPlay
            autoPlayInterval={1000}
            infinite
            disableButtonsControls
        />
    )
}
export default MainCarousel