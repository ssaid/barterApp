import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Card, CardHeader, CardBody, CardFooter, Input, Button, Divider} from "@nextui-org/react";
import { UserCreate } from '../../../types/user';
import { useContext, useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../hooks/useAuth';
import { parseError } from '../../../utils/parseError';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';

const initialValues: UserCreate = {
  username: '',
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().required('Campo requerido'),
  email: Yup.string().email('Email invalido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})


export const RegisterForm = () => {

  const [ pswVisible, setPswVisible ] = useState(false)

  const navigate = useNavigate()
  const { handleLogin } = useContext(AuthContext)
  const { register, login } = useAuth()

  const togglePswVisibility = () => {
    setPswVisible(visible => !visible)
  }

  const handleSubmit = (values: UserCreate) => {
    register.mutate(values)

  }

  useEffect(() => {
    if (register.isSuccess){
      const { username, ...user } = register.variables
      login.mutate(user)
    }
  }, [register.isSuccess])

  useEffect(() => {
    if (login.isSuccess){
      handleLogin({ token: login.data.data.access })
      localStorage.setItem('token', login.data.data.access)
      localStorage.setItem('refresh_token', login.data.data.refresh)
      navigate('/')
    }
  }, [login.isSuccess])

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
                  name="username" 
                  type="text" 
                  color={formik.touched.username && formik.errors.username ? "danger" : ""}
                  placeholder="Nombre completo" 
                  validationState={formik.touched.username && formik.errors.username ? "error" : ""}
                  errorMessage={formik.touched.username && formik.errors.username && formik.errors.username}
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
              <CardFooter className="justify-end gap-4" >
                <Button variant="solid" color="primary" type="submit" isLoading={register.isLoading || login.isLoading}>
                  Registrarse
                </Button>
              </CardFooter>
              <p className={`text-white bg-danger text-center transition duration-500 py-1 -mb-5 mt-2 ${register.isError ? '' : 'translate-y-8'} `} >
                {parseError(register.error) || "Ha ocurrido un error. Vuelve a intentar mas tarde."}
              </p>
            </Form>
        }
      </Formik>
    </Card>
  )


}
