import { AiFillHeart } from "react-icons/ai";
import { Image as ImageType, Post } from "../../../types/post"
import {Button, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import { useState } from "react";


type Props = {
  post: Post
}

export const PostCard = ( { post }: Props ) => {

  const [ like, setLike ] = useState(false)


  return (
    <Card className="py-4 mx-2 max-w-96 relative">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Daily Mix</p>
        <small className="text-default-500">12 Tracks</small>
        <h4 className="font-bold text-large">Frontend Radio</h4>
        <Button 
          isIconOnly
          variant="light"
          className="absolute top-0 right-0 z-10"
          onClick={() => setLike(!like)}
        >
          <AiFillHeart 
            className={ `text-lg ${ like ? 'text-danger' : '' }` }
          />
        </Button>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          shadow="sm"
          radius="lg"
          height="350px"
          width="350px"
          alt={post.title}
          className="object-cover rounded-xl"
          src={(post.images as ImageType[])[0].image.large_square_crop}
        />
      </CardBody>
    </Card>

  )

}


