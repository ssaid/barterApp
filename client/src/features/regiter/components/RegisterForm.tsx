import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Card, CardHeader, CardBody, CardFooter, Input, Button, Divider} from "@nextui-org/react";
import { UserBase } from '../../../types/user';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'

const initialValues: UserBase = {
  name: '',
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  name: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Email invalido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})

export const RegisterForm = () => {

  const [ pswVisible, setPswVisible ] = useState(false)

  const togglePswVisibility = () => {
    setPswVisible(visible => !visible)
  }

  const handleSubmit = (values: UserBase) => {
    console.log(values)
  }

  return (
    <Card className="max-w-lg w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>Crea una cuenta</CardHeader>
      <Button variant="ghost" className='mx-5 mb-5'>
       <FcGoogle /> Continuar con Google
      </Button>
      <div className="relative">
        <span className='absolute right-[50%] -top-0 bg-content1 w-5 text-center rounded-full'>O</span>
        <Divider className='my-3'/>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {
          formik =>
            <Form>
              <CardBody className='flex flex-col gap-3'>
                <Field 
                  as={Input}
                  variant="bordered"
                  name="name" 
                  type="name" 
                  color={formik.touched.name && formik.errors.name ? "danger" : ""}
                  placeholder="Nombre" 
                  validationState={formik.touched.name && formik.errors.name ? "error" : ""}
                  errorMessage={formik.touched.name && formik.errors.name && formik.errors.name}
                />
                <Field 
                  as={Input}
                  variant="bordered"
                  name="email" 
                  type="email" 
                  color={formik.touched.email && formik.errors.email ? "danger" : ""}
                  placeholder="Email" 
                  validationState={formik.touched.email && formik.errors.email ? "error" : ""}
                  errorMessage={formik.touched.email && formik.errors.email && formik.errors.email}
                />
                <Field 
                  as={Input}
                  variant="bordered"
                  name="password" 
                  placeholder="Password" 
                  color={formik.touched.password && formik.errors.password ? "danger" : ""}
                  validationState={formik.touched.password && formik.errors.password}
                  errorMessage={formik.touched.password && formik.errors.password && formik.errors.password}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={togglePswVisibility}>
                      {
                        pswVisible 
                          ? <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                          : <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                      }
                    </button>
                  }
                  type={pswVisible ? "text" : "password"}
                />
              </CardBody>
              <CardFooter className="justify-end" >
                <Button variant="shadow" color="primary" type="submit">
                  Registrarse
                </Button>
              </CardFooter>
            </Form>
        }
      </Formik>
    </Card>
  )


}
