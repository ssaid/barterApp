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
    <Card className="py-4 max-w-xs relative w-full">
      <CardHeader className="py-2 px-4 flex-col items-start gap-1">
        <h4 className="font-bold text-large">{ post.title }</h4>
        <p className="text-tiny uppercase font-bold truncate max-w-[100%]">{ post.description }</p>
        <Button 
          isIconOnly
          variant="light"
          className="absolute top-0 right-0 z-10 m-1"
          onClick={() => setLike(!like)}
        >
          <AiFillHeart 
            className={ `text-xl ${ like ? 'text-danger' : '' }` }
          />
        </Button>
      </CardHeader>
      <CardBody 
        className="overflow-visible p-4"
      >
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


