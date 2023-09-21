import { FC, useState } from "react"
import { Image as ImageNUI, Pagination } from "@nextui-org/react"
import { type Image } from "../../../types/post"

type Props = {
  images: Image[]
}

export const Carousel: FC<Props> = ({ images }) => {

  const [ currentSlide, setCurrentSlide ] = useState(0)

  const handleSlideTo = (nextSlide: number) => {

    if ( nextSlide < 0 ) return setCurrentSlide(images.length - 1)
    if ( nextSlide > images.length - 1 ) return setCurrentSlide(0)
    
    setCurrentSlide(nextSlide)
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="relative h-[100vw] sm:h-[500px] overflow-hidden flex justify-center items-center p-1 rounded-md">
        {
          images.map(({ image, id }, index) => 
            <div 
              key={id}
              className={`${index === currentSlide ? 'block' : 'hidden'} duration-700 ease-in-out` }
            >
              <ImageNUI 
                src={image.full_size} 
                width="100%"
                height="500px"
                className="object-cover"
              />
            </div>
          )
        }
      </div>

      <Pagination 
        showShadow 
        size="sm"
        color="warning" 
        total={images.length} 
        initialPage={1} 
        onChange={handleSlideTo}
      />
    </div>
  )
}
