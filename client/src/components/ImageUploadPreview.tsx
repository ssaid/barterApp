import { Avatar, Badge } from "@nextui-org/react"
import { memo } from "react"


type ImageUploadPreviewProps = {
  img: string
  onClick: () => void
}

export const ImageUploadPreview = memo(({ img, onClick }: ImageUploadPreviewProps) => {

  console.log('render')

  return ( 
    <Badge 
      content="&times;" 
      size="md" 
      isOneChar 
      color='default'
      className='cursor-pointer'
      onClick={() => onClick()}
    >
      <Avatar 
        isBordered
        src={img} 
        alt="image" 
        className="w-16 h-16 rounded-md" 
      />
    </Badge>
  )
}, (prevProps, nextProps) => {
    console.log({prevProps})
    console.log({nextProps})
  return prevProps.img == nextProps.img
})
