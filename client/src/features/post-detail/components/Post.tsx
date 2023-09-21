import { FC } from "react"


type Props = {
  slug: string
}

export const Post: FC<Props> = ({ slug }) => {


  return (
    <p>slug: { slug }</p>
  )

}
