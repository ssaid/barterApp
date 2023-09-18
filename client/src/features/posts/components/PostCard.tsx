import { AiFillHeart } from "react-icons/ai";
import { Image as ImageType, Post } from "../../../types/post"
import {Button, Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import { MutableRefObject, memo, useEffect, useRef, useState } from "react";
import noImage from '../../../assets/image_not_available.png'
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { usePostCard } from "../hooks/usePostCard";


type Props = {
  post: Post
  fetchesOnVisible?: boolean
  fetchNextPage?: () => void
}

export const PostCard = memo(({ post, fetchNextPage, fetchesOnVisible }: Props ) => {

  const [ liked, setLiked ] = useState(post.is_liked)
  const [ likes, setLikes ] = useState(post.like_count)

  const didFetch = useRef<boolean>(false)

  const { like, unlike } = usePostCard()

  const toggleLike = async() => {
    const { data } = liked ? await unlike(post.id) : await like(post.id)
    setLiked(prev => !prev)
    setLikes(data.likes)
  }

  const [ ref, entry ] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    if (entry?.isIntersecting && fetchesOnVisible && !didFetch.current) {
      didFetch.current = true
      fetchNextPage()
    }

  }, [entry])


  return (
    <Card className="py-4 max-w-xs relative w-full" ref={ref as MutableRefObject<HTMLInputElement>}>
      <CardHeader className="py-2 px-4 flex-col items-start gap-1">
        <h4 className="font-bold text-large">{ post.title }</h4>
        <p className="text-tiny uppercase font-bold truncate max-w-[100%]">{ post.description }</p>
        <Button 
          variant="light"
          className="absolute top-1 right-1 z-10 m-1 px-unit-1"
          size="sm"
          onClick={toggleLike}
          endContent={
            <AiFillHeart 
              className={ `text-xl ${ liked ? 'text-danger' : '' }` }
            />
          }
        >
          { likes }
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


