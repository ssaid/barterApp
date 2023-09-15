import { Card, CardBody } from "@nextui-org/react";



export const EmptyRequestCard = () => ( 
  <div className="flex justify-center w-full p-2 absolute top-1/2 left-0">
    <Card>
      <CardBody>
        <p className="text-center">Ups. al parecer no hay nada aqui 👾
        </p>
      </CardBody>
    </Card>
  </div>
)
