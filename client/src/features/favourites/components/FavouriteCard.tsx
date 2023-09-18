import { AiFillHeart } from "react-icons/ai";
import { Image as ImageType, Post } from "../../../types/post"
import {Button, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import { memo } from "react";
import noImage from '../../../assets/image_not_available.png'
import { usePostCard } from "../../posts/hooks/usePostCard";
import { useQueryClient } from "@tanstack/react-query";


type Props = {
  post: Post
}

export const FavouriteCard = memo(({ post }: Props ) => {

  const { unlike } = usePostCard()
  const queryClient = useQueryClient()

  const handleUnlike = async() => {
    await unlike(post.id)
    queryClient.invalidateQueries( ['favourites'] )
  }

  return (
    <Card className="py-4 max-w-xs relative w-full" >
      <CardHeader className="py-2 px-4 flex-col items-start gap-1">
        <h4 className="font-bold text-large">{ post.title }</h4>
        <p className="text-tiny uppercase font-bold truncate max-w-[100%]">{ post.description }</p>
        <Button 
          variant="light"
          className="absolute top-1 right-1 z-10 m-1 px-unit-1 rounded-full"
          isIconOnly
          onClick={handleUnlike}
        >
          <AiFillHeart 
            className='text-xl text-danger'
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
          src={(post.images as ImageType[])[0]?.image?.large_square_crop ?? noImage}
        />
      </CardBody>
    </Card>
  )
})


