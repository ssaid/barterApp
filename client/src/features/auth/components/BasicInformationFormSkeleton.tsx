import { Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
  Input,
  CardFooter 
} from "@nextui-org/react"


export const BasicInformationFormSkeleton = () => {

  return (
    <Card className="max-w-3xl w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>
        <Skeleton className="rounded-lg w-56 h-6" />
      </CardHeader>
      <Divider className='my-3'/>
      <CardBody className='flex flex-col gap-3'>
        <Skeleton className="rounded-lg w-32 h-6" />
        <Divider />
        <Skeleton className='rounded-lg'>
          <Input label='skeleton'/>
        </Skeleton>
        <Skeleton className='rounded-lg'>
          <Input label='skeleton'/>
        </Skeleton>
        <Skeleton className='rounded-lg'>
          <Input label='skeleton'/>
        </Skeleton>
        <Skeleton className="rounded-lg w-32 h-6" />
        <Divider />
        <div className='flex gap-2 flex-col'>
          <div className='flex gap-2' >
            <Skeleton className='rounded-lg'>
              <Input className='w-3/5' />
            </Skeleton>
            <Skeleton className='rounded-lg w-full'>
              <Input label='skeleton'/>
            </Skeleton>
            <Skeleton className='rounded-lg w-20 h-14' />
          </div>

          <div className='flex justify-end mt-5'>
            <Skeleton className='rounded-lg w-20 h-12' />
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-end px-5">
        <Skeleton className='rounded-lg w-24 h-12' />
      </CardFooter>
    </Card>
  )
}
