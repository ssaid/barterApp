import React, { useState } from "react";
import {Card, CardBody, Image, Button, Progress, Chip, Tooltip, Spinner} from "@nextui-org/react";
import { Image as ImageType, Post } from "../../../types/post";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { MdOutlineUnpublished } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IconWrapperWithCounter } from "../../../components/IconWraperWithCounter";
import { HiPencilSquare } from "react-icons/hi2";
import { Category } from "../../../types/category";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useMutation } from "@tanstack/react-query";
import { patchPost } from "../services";

type WidePostCardProps = {
  post: Post
}

export const WidePostCard = ({ post }: WidePostCardProps) => {
  
  const isMobile = useMediaQuery("only screen and (max-width : 640px)")

  const [published, setPublished] = useState(post.state);

  const mutation = useMutation( patchPost )

  const handleChangeState = async() => {
    const {data} = await mutation.mutateAsync({id: post.id, state: published === 'active' ? 'done' : 'active'})
    setPublished(data.state)
  }

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] max-h-[120px] sm:max-h-[150px] w-full"
      shadow="sm"
      classNames={{
        body: 'p-2',
      }}
    >
      <CardBody>
        <div className="flex gap-4 items-stretch">
          <div className="shrink-0">
            <Image
              alt="Album cover"
              className="object-cover"
              height={ isMobile ? "100px" : "125px" }
              shadow="md"
              src={
                isMobile
                ? (post.images as ImageType[])[0].image.medium_square_crop
                : (post.images as ImageType[])[0].image.small_square_crop
              }
              width={ isMobile ? "100px" : "125px" }
            />
          </div>

          <div className="flex flex-col gap-2 w-full justify-between">
            <div className="flex gap-2 absolute right-0 px-2">

              <Tooltip 
                content="Editar post"
                placement="bottom"
              >
                <Button
                  isIconOnly
                  variant="faded"
                  color="primary"
                  // onPress={() =>
                  //   setPublished((prev) => (prev === 'active' ? 'done' : 'active'))
                  // }
                >
                  <HiPencilSquare className="text-lg" />
                </Button>
              </Tooltip>

              <Tooltip 
                content={`${published === 'active' ? 'Desactivar' : 'Activar' } publicacion`}
                placement="bottom"
              >
                <Button
                  isIconOnly
                  variant="faded"
                  color={
                    mutation.isLoading ? 'default' :
                    published === 'active' ? 'success' : 'danger'
                  }
                  onPress={handleChangeState}
                >
                  {
                    mutation.isLoading 
                      ? <Spinner size="sm" color="default" />
                      :
                    published === 'active' 
                      ? <AiOutlineCheckCircle className="text-2xl" />
                      : <MdOutlineUnpublished className="text-2xl" />
                  }
                </Button>
              </Tooltip>
            </div>
            <div className="flex flex-col gap-1 items-stretch justify-between h-full">
              <h3 className="font-semibold text-foreground/90 text-lg sm:text-xl sm:py-4 truncate w-32 sm:w-full">
                {post.title}
              </h3>
              <p className="text-small truncate w-32 sm:w-full sm:max-w-xs text-foreground/80">{post.description}</p>
            </div>
            <div className="flex justify-end gap-2">
              <IconWrapperWithCounter className="bg-default/60 text-foreground px-2">
                <AiFillEye />
                {post.interactions}
              </IconWrapperWithCounter>
              <IconWrapperWithCounter className="bg-danger/60 text-white px-2">
                <AiFillHeart className="text-danger" />
                {post.likes}
              </IconWrapperWithCounter>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
