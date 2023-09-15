import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Card, CardHeader, CardBody, CardFooter, Input, Button, Divider } from "@nextui-org/react";
import { UserBase } from '../../../types/user';
import { useContext, useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { parseError } from '../../../utils/parseError';
import { AuthContext } from '../../../context/auth';
import { api } from '../../../api/api';

const initialValues: UserBase = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email('Email invalido').required('Campo requerido'),
  password: Yup.string().required('Campo requerido'),
})

export const LoginForm = () => {

  const [ pswVisible, setPswVisible ] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { handleLogin } = useContext(AuthContext)

  const togglePswVisibility = () => {
    setPswVisible(visible => !visible)
  }

  const handleSubmit = (values: UserBase) => {
    login.mutate(values)
  }

  useEffect(() => {

    if (login.isSuccess){
      handleLogin({ token: login.data.data.access })
      localStorage.setItem('token', login.data.data.access)
      localStorage.setItem('refresh_token', login.data.data.refresh)

      api.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${login.data.data.access}`
          return config
        },
      )
      navigate('/')

    }

  }, [login.isSuccess])

  return (
    <Card className="max-w-lg w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>Ingresa</CardHeader>
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
              <CardFooter className="flex flex-col" >
                <div className='text-end w-full px-3'>
                  <Button variant="solid" color="primary" type="submit" isLoading={login.isLoading}>
                    Ingresar
                  </Button>
                </div>
                <Divider className='my-5' />
              <p>Todavia no tenes cuenta? <Link to='/register' className='text-primary'>Registrate</Link></p>
              </CardFooter>
              <p className={`text-white bg-danger text-center transition duration-500 py-1 -mb-5 mt-2 ${login.isError ? '' : 'translate-y-8'} `} >
                {parseError(login.error) || "Ha ocurrido un error. Vuelve a intentar mas tarde."}
              </p>
            </Form>
        }
      </Formik>
    </Card>
  )


}
