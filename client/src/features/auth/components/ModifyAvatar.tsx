import { Avatar, Image } from "@nextui-org/react"
import { memo, useMemo, useRef, useState } from "react"
import { MdOutlineAddPhotoAlternate } from "react-icons/md"
import { compressImage } from "../../../utils/compressImage"



type Props = {
  image: null | string | File
  onChange: (file: File) => void
}

const accept = ["image/png", "image/jpeg", "image/jpg"]

export const ModifyAvatar = memo(({ image, onChange }: Props) => {

  const image_url = useMemo(() => 
    typeof image === "string" || image === null
      ? image 
      : URL.createObjectURL(image)
    , [image])

  const inputRef = useRef<HTMLInputElement>(null)
  const [ showUpload, setShowUpload ] = useState(false)

  const handleChange = async(e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const newImage = await compressImage(e.target.files[0])
      onChange(newImage);
    }
  }

  const handleOpenFileExplorer = () => {
    inputRef.current.value = ""
    inputRef.current?.click()
  }

  return (
    <div className='relative'>
      <Avatar 
        onMouseOver={() => setShowUpload(true)}
        onMouseOut={() => setShowUpload(false)}
        onClick={handleOpenFileExplorer}
        className='mx-auto w-28 h-28 mb-3 sm:mb-0 hover:cursor-pointer'
        classNames={{
          base:"transition duration-300 ease-in-out",
          fallback:"transition duration-300 ease-in-out",
        }}
        fallback = {
          <MdOutlineAddPhotoAlternate className="text-4xl"/>
        }
        src={ showUpload ? undefined : image_url as string }
      />
      <input 
        type="file"
        ref={inputRef}
        multiple={false}
        onChange={handleChange}
        className='hidden'
        accept={accept?.join(",") ?? "*"}
      />
    </div>
  )
}, (prevProps, nextProps) => prevProps.image === nextProps.image)
