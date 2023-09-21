import { FC } from "react"
import { Carousel } from "./Carousel"
import { usePost } from "../hooks/usePost"
import { LoadingWithBackdrop } from "../../../components/LoadingWithBackdrop"
import { Image } from "../../../types/post"
import { Button, Card, CardBody, Link } from "@nextui-org/react"


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
          {
            !!data.contacts?.length 
              ?
                (
                <section className="p-2">
                  <h5 className="text-lg">Metodos de contacto</h5>
                  <div className="flex flex-col gap-2 p-2">
                    {
                      data.contacts?.map(contact => 
                        <Button 
                          fullWidth
                          variant="ghost"
                          startContent={
                            <img 
                              className="h-unit-6"
                              src={'http://localhost:8000'+contact.contact_method.image} 
                            />
                          }
                        >
                          { contact.contact }
                        </Button>
                      )
                    }
                  </div>
                </section>
              )
              :
              (
                <Card className="bg-warning/20 w-full">
                  <CardBody className="text-warning">
                    <p className="flex gap-1 flex-wrap mx-auto">
                      Para ver los metodos de contacto debes 
                      <Link 
                        href="/login" 
                        color="warning" 
                        showAnchorIcon
                        className="font-bold"
                      >
                        Iniciar sesion
                      </Link>
                    </p>
                  </CardBody>
                </Card>
              )
          }
        </aside>
      </div>
    </div>

  )

}
