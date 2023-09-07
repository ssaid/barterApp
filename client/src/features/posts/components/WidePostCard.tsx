import React from "react";
import {Card, CardBody, Image, Button, Progress, Chip} from "@nextui-org/react";
import { Image as ImageType, Post } from "../../../types/post";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { MdOutlineUnpublished } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IconWrapperWithCounter } from "../../../components/IconWraperWithCounter";
import { HiPencilSquare } from "react-icons/hi2";
import { Category } from "../../../types/category";

type WidePostCardProps = {
  post: Post
}

export const WidePostCard = ({ post }: WidePostCardProps) => {

  const [published, setPublished] = React.useState(post.state);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px] max-h-[170px] w-full"
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
              height="150px"
              shadow="md"
              src={(post.images as ImageType[])[0].image.medium_square_crop}
              width="150px"
            />
          </div>

          <div className="flex flex-col gap-2 w-full justify-between">
            <div className="flex gap-2 absolute right-0 px-2">

              <Button
                isIconOnly
                variant="faded"
                color="primary"
                onPress={() =>
                  setPublished((prev) => (prev === 'active' ? 'done' : 'active'))
                }
              >
                <HiPencilSquare className="text-lg" />
              </Button>
              <Button
                isIconOnly
                variant="faded"
                color={published === 'active' ? 'success' : 'danger'}
                onPress={() =>
                  setPublished((prev) => (prev === 'active' ? 'done' : 'active'))
                }
              >
                {
                  published === 'active' 
                    ? <AiOutlineCheckCircle className="text-2xl" />
                    : <MdOutlineUnpublished className="text-2xl" />
                }
              </Button>
            </div>
            <div className="flex flex-col gap-1 items-stretch justify-between h-full">
              <h3 className="font-semibold text-foreground/90 text-xl">
                {post.title}
              </h3>
              <p className="text-small text-ellipsis text-foreground/80">{post.description}</p>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex gap-2 items-end">
                {(post.categories as Category[]).map(category => (
                  <Chip key={category.id} color="secondary">
                    {category.name}
                  </Chip>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <IconWrapperWithCounter className="bg-default/60 text-foreground px-2">
                  <AiFillEye />
                  {post.interactions}
                </IconWrapperWithCounter>
                <IconWrapperWithCounter className="bg-danger/60 text-white px-2">
                  <AiFillHeart className="text-danger" />
                  {post.interactions}
                </IconWrapperWithCounter>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
