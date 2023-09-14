import {Card, CardBody, Link} from "@nextui-org/react";

export const Fallback = () => (

  <div className="flex flex-col items-center justify-center h-screen p-2">
    <Card>
      <CardBody>
        <p className="text-center">Algo salio mal, lo sentimos 💔. 
          <Link 
            className="ml-1"
            showAnchorIcon 
            href="/"
          >
            Volver al inicio 
          </Link>
        </p>
      </CardBody>
    </Card>
  </div>

)
