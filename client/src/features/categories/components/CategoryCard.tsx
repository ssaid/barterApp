import { Card, CardFooter, Image } from "@nextui-org/react";
import { Category } from "../../../types/category";



type Props = {
  category: Category
}


export const CategoryCard = ({ category }: Props) => {

  return (
    <Card
      isFooterBlurred
      isPressable
      onPress={() => console.log("pressed")}
      radius="sm"
      className="h-[150px] w-[150px] relative shrink-0"
    >
      <Image
        alt={category.name}
        src={category.img}
        removeWrapper
        className="z-0 w-full h-full object-cover"
      />
      <div
        className="bg-black opacity-50 absolute justify-center h-full overflow-hidden w-full z-10"
      ></div>
        <CardFooter
          className="absolute flex justify-center items-end w-full h-full z-20 backdrop-blur-0"
        >
          <p className="text-white font-semibold z-20">{category.name}</p>
        </CardFooter>
    </Card>

  )

}
