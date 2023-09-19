import { Field, FieldArray, Formik, FormikErrors } from 'formik';
import * as Yup from 'yup';
import {Card, CardHeader, CardBody, CardFooter, Input, Button, Divider, Select, SelectItem, Avatar, Spinner } from "@nextui-org/react";
import { ContactMethodCreate, UserInformation } from '../../../types/user';
import { MdAdd, MdDelete, MdPlace } from 'react-icons/md';
import { HiOutlineExternalLink } from 'react-icons/hi';

import { useFormInfo } from '../hooks/useFormInfo';
import { useCallback, useState } from 'react';
import { BasicInformationFormSkeleton } from './BasicInformationFormSkeleton';
import { ImageSizes } from '../../../types/category';
import { useNavigate } from 'react-router-dom';
import { ModifyAvatar } from './ModifyAvatar';
import { useQueryClient } from '@tanstack/react-query';


const validationSchema = Yup.object({
  country: Yup.string().required('Este campo es requerido'),
  state: Yup.string().required('Este campo es requerido'),
  city: Yup.string().required('Este campo es requerido'),
  contacts: Yup.array().of( 
    Yup.object().shape({
      contact_method: Yup.string().required('Este campo es requerido'),
      contact: Yup.string().required('Este campo es requerido')
    })
  ).required('Debes ingresar al menos un metodo de contacto')
})

export const BasicInformationForm = () => {

  const [ isSaved, setIsSaved ] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    location,
    save,
    loading,
    c_methods,
    user_info
  } = useFormInfo()

  if (loading) return <BasicInformationFormSkeleton />

  const initialValues: UserInformation = {
    avatar: (user_info.data.avatar as ImageSizes).medium_square_crop ?? '',
    country: user_info.data.country ?? '',
    state: user_info.data.state ?? '',
    city: user_info.data.city ?? '',
    coords: { latitude: 0, longitude: 0 },
    contacts: user_info.data.contacts?.length 
    ? user_info.data.contacts.map( ({ contact_method, contact }) => ({ contact_method, contact }) )
    : [ { contact_method: undefined, contact: '' } ]
  }


  const handleSave = async(values: UserInformation) => {
    const { avatar, ...data } = values

    if (avatar instanceof File) data['avatar'] = avatar

    const {status} = await save.mutateAsync(data)
    if (status === 200){
      setIsSaved( status === 200 )
      queryClient.invalidateQueries(['user_info'])

    }
  }

  return (
    <Card className="max-w-3xl w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>Informacion de contacto</CardHeader>
      <Divider className='my-3'/>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSave}
        validationSchema={validationSchema}
      >
        {
          formik => {

            const handleLocation = useCallback(() => {
              navigator.geolocation.getCurrentPosition(
                async({ coords }) => {
                  const { latitude, longitude } = coords;
                  const data = await location.mutateAsync({ latitude, longitude })
                  if (data) {
                    const { city, region: state, country } = data
                    
                    formik.setValues({
                      ...formik.values,
                      city,
                      state,
                      country,
                      coords: { latitude, longitude }
                    })
                  }
                }
              )
            }, [location, formik])

            return (
              <>
                <CardBody className='flex flex-col gap-3'>
                  <ModifyAvatar 
                    image={formik.values.avatar as string | File}
                    onChange={avatar => formik.setFieldValue('avatar', avatar)}
                  />
                  <div className='flex justify-between items-end'>
                    <p>Ubicacion</p>
                    <Button 
                      className="bg-default/50 hover:bg-default/80 text-foreground cursor-pointer"
                      onClick={handleLocation}
                      isDisabled={location.isLoading}
                    >
                      Obtener Ubicacion
                      {
                        location.isLoading
                          ? <Spinner size='sm' color="current" />
                          : <MdPlace className="text-lg" />
                      }
                    </Button>
                  </div>
                  <Divider />
                  <Field 
                    as={Input}
                    isDisabled
                    variant="bordered"
                    label="Pais" 
                    name="country" 
                    value={formik.values.country}
                    color={formik.touched.country && formik.errors.country ? "danger" : ""}
                    validationState={formik.touched.country && formik.errors.country ? "error" : ""}
                    errorMessage={formik.touched.country && formik.errors.country && formik.errors.country}
                  />

                  <Field 
                    as={Input}
                    variant="bordered"
                    isDisabled
                    name="state" 
                    value={formik.values.state}
                    color={formik.touched.state && formik.errors.state ? "danger" : ""}
                    label="Provincia" 
                    validationState={formik.touched.state && formik.errors.state ? "error" : ""}
                    errorMessage={formik.touched.state && formik.errors.state && formik.errors.state}
                  />

                  <Field 
                    as={Input}
                    isDisabled
                    variant="bordered"
                    value={formik.values.city}
                    name="city" 
                    label="Ciudad" 
                    color={formik.touched.city && formik.errors.city ? "danger" : ""}
                    validationState={formik.touched.city && formik.errors.city}
                    errorMessage={formik.touched.city && formik.errors.city && formik.errors.city}
                  />

                  <p>Metodos de contacto</p>
                  <Divider />
                  <FieldArray name="contacts" >
                    {
                      props => 
                        <div className='flex gap-2 flex-col'>
                          {
                            props.form.values.contacts.map((_, index) => (
                              <div 
                                key={index} 
                                className='flex gap-2'
                              >
                                <Field
                                  name={`contacts.${index}.contact_method`}
                                  as={Select}
                                  className='w-3/5'
                                  label="Metodo"
                                  variant="bordered"
                                  selectedKeys={
                                    formik.values.contacts[index].contact_method
                                      ? [formik.values.contacts[index].contact_method.toString()]
                                      : []
                                  }
                                  onClose={() => formik.setFieldTouched(`contacts.${index}.contact_method`, true)}
                                  color={formik.touched.contacts?.[index]?.contact_method && (formik.errors.contacts as FormikErrors<ContactMethodCreate>[])?.[index]?.contact_method ? "danger" : ""}
                                  errorMessage={formik.touched.contacts?.[index]?.contact_method && (formik.errors.contacts as FormikErrors<ContactMethodCreate>[])?.[index]?.contact_method }
                                  validationState={formik.touched.contacts?.[index]?.contact_method && (formik.errors.contacts as FormikErrors<ContactMethodCreate>[])?.[index]?.contact_method}
                                  classNames={{
                                    popover: 'min-w-max'
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(`contacts.${index}.contact_method`, e.target.value)
                                    formik.setFieldValue(`contacts.${index}.contact`, '')
                                    formik.setFieldTouched(`contacts.${index}.contact`, false)
                                  }}

                                >
                                  {
                                    c_methods.data?.map(m => 
                                      <SelectItem 
                                        key={m.id} 
                                        value={m.id} 
                                        startContent={
                                          <Avatar 
                                            alt={m.name}
                                            className="w-6 h-6" 
                                            src={m.image}
                                          />
                                        }
                                      >

                                        { m.name }
                                      </SelectItem>
                                    )
                                  }
                                </Field>
                                <Field 
                                  name={`contacts.${index}.contact`}
                                  as={Input}
                                  variant="bordered"
                                  //@ts-ignore
                                  label={
                                    c_methods.data.find(
                                      m => m.id === formik.values.contacts[index].contact_method
                                    )?.type ?? 'Contacto'
                                  }
                                  color={formik.touched.contacts?.[index]?.contact && (formik.errors.contacts as FormikErrors<ContactMethodCreate>[])?.[index]?.contact ? "danger" : ""}
                                  errorMessage={formik.touched.contacts?.[index]?.contact && (formik.errors.contacts as FormikErrors<ContactMethodCreate>[])?.[index]?.contact}
                                  validationState={formik.touched.contacts?.[index]?.contact && (formik.errors.contacts as FormikErrors<ContactMethodCreate>[])?.[index]?.contact}
                                />
                                <Button 
                                  isIconOnly 
                                  className={ `mt-1 ${ formik.values.contacts.length > 1 ? 'hover:bg-danger' : 'cursor-default' }` }
                                  size='lg'
                                  onClick={() => formik.values.contacts.length > 1 && props.remove(index)}
                                >
                                  <MdDelete />
                                </Button>
                              </div>
                            ))
                          }

                          <div className='flex justify-end mt-5'>
                            <Button 
                              onClick={() => props.push({contact_method: undefined, contact:''})} 
                              startContent={<MdAdd/>}
                            >
                              Agregar
                            </Button>
                          </div>
                        </div>
                    }
                  </FieldArray>
                </CardBody>
                <CardFooter className="justify-end px-5">
                  {
                    isSaved
                      ? 
                      <Button 
                        variant="solid" 
                        color="success" 
                        type="submit" 
                        isLoading={save.isLoading}
                        onClick={() => navigate('/')}
                        endContent={
                          <HiOutlineExternalLink />
                        }
                      >
                        Guardado exitoso! volver al inicio
                      </Button>
                      :
                      <Button 
                        variant="solid" 
                        color="primary" 
                        type="submit" 
                        isLoading={save.isLoading}
                        onClick={() => formik.handleSubmit()}
                      >
                        Guardar
                      </Button>
                  }
                </CardFooter>
              </>
            )
          }
        }
      </Formik>
    </Card>
  )

}
