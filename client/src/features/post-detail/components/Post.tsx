import { FC } from "react"
import { Carousel } from "./Carousel"
import { usePost } from "../hooks/usePost"
import { LoadingWithBackdrop } from "../../../components/LoadingWithBackdrop"
import { Image } from "../../../types/post"


type Props = {
  slug: string
}

export const Post: FC<Props> = ({ slug }) => {

  const { data, isLoading } = usePost({ slug })

  if (isLoading) return <LoadingWithBackdrop />

  return (
    <div>
      <h4 className="text-xl md:text-2xl text-center font-bold p-5">{ data.title }</h4>
      <div className="flex flex-col md:flex-row">
        <Carousel images={data.images as Image[]}/>
        <aside className="flex flex-col gap-2 p-2 justify-between md:w-5/12">
          <section className="p-2">
            <h5 className="text-lg">Descripcion</h5>
            <p className="p-2">{ data.description }</p>
          </section>
          <section className="p-2">
            <h5 className="text-lg">Metodos de contacto</h5>
            <ul className="decoration-none p-2">
              <li>Telefono: 30920123123</li>
              <li>Correo: example@email.com</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>

  )

}
