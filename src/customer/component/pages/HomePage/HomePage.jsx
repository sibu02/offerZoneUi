import React, { useEffect } from 'react'
import MainCarousel from '../../HomeCarousels/MainCarousel'
import HomeSectionCardCarousel from '../../HomeSectionCardCorousel/HomeSectionCardCarousel'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDataForHome } from '../../../../State/Product/Action'
import PageLoader from '../../Utility/PageLoader'

const HomePage = () => {
  const dispatch = useDispatch();
  const homeData = useSelector((state)=>state.product.homeData);
  useEffect(()=>{
    dispatch(getProductDataForHome());
  },[])
  return (
    <div>
        <MainCarousel/>
        {homeData?(
          <div>
          <HomeSectionCardCarousel sectionName={"Kurta"} data={homeData.Kurta}/>
          <HomeSectionCardCarousel sectionName={"Saree"} data={homeData.Saree}/>
          <HomeSectionCardCarousel sectionName={"Lahenga"} data={homeData.Lahenga}/>
          <HomeSectionCardCarousel sectionName={"Pant"} data={homeData.Pant}/>
          <HomeSectionCardCarousel sectionName={"Sweater"} data={homeData.Sweater}/>
          <HomeSectionCardCarousel sectionName={"T-Shirt"} data={homeData["T-Shirt"]}/>
      </div>
        ):(
          <PageLoader/>
        )}
        
    </div>
  )
}

export default HomePage