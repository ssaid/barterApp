import { Field, FieldArray, useFormik, FormikProvider, Formik } from 'formik';
import * as Yup from 'yup';
import {Card, CardHeader, CardBody, CardFooter, Input, Button, Divider, Select, SelectItem, Avatar, Spinner} from "@nextui-org/react";
import { UserInformation } from '../../../types/user';
import { MdAdd, MdDelete, MdPlace } from 'react-icons/md';
import * as service from '../services';

import wp_icon from '../../../assets/whatsapp_icon.png'
import fb_icon from '../../../assets/facebook_icon.ico'
import { IconWrapper } from '../../../components/IconWrapper';
import { useFormInfo } from '../hooks/useFormInfo';
import { useCallback, useEffect, useState } from 'react';
import { Point } from '../../../types/location';
import { useQuery } from '@tanstack/react-query';

const enum MethodLabels{
  'whatsapp'= 'Telefono',
  'facebook'= 'Perfil',
}


const validationSchema = Yup.object({
  country: Yup.string().required('Este campo es requerido'),
  state: Yup.string().required('Este campo es requerido'),
  city: Yup.string().required('Este campo es requerido'),
  contact_methods: Yup.array().of( 
    Yup.object().shape({
      method: Yup.string().required('Este campo es requerido'),
      value: Yup.string().required('Este campo es requerido')
    })
  ).required('Debes ingresar al menos un metodo de contacto')
})

export const BasicInformationForm = () => {

  const {countries, states, location, loading} = useFormInfo()

  const methods = [
    {
      value: 'whatsapp',
      label: 'Whatsapp',
      icon: wp_icon,
    },
    {
      value: 'facebook',
      label: 'Facebook',
      icon: fb_icon,
    }
  ]

  if (loading) return <p>loading</p>

  const initialValues: UserInformation = {
    country: countries.data[0].id,
    state: states.data[0].id,
    city: '',
    contact_methods: [
      { method: '', value: '' }
    ]
  }

  return (
    <Card className="max-w-3xl w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>Informacion de contacto</CardHeader>
      <Divider className='my-3'/>
      <Formik
        initialValues={initialValues}
        onSubmit={console.log}
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
                    const { city_name, region_id, country_id } = data
                    
                    formik.setValues({
                      ...formik.values,
                      city: city_name,
                      state: region_id,
                      country: country_id
                    })
                  }
                }
              )
            }, [location, formik])


            return (
              <>
                <CardBody className='flex flex-col gap-3'>
                  <p>Ubicacion</p>
                  <Divider />
                  <Field 
                    as={Select}
                    variant="bordered"
                    label="Pais" 
                    name="country" 
                    defaultSelectedKeys={[formik.values.country]}
                    color={formik.touched.country && formik.errors.country ? "danger" : ""}
                    validationState={formik.touched.country && formik.errors.country ? "error" : ""}
                    errorMessage={formik.touched.country && formik.errors.country && formik.errors.country}
                  >
                    {
                      countries.data.map( c => 
                        <SelectItem 
                          key={c.id} 
                          value={c.id} 
                          startContent={
                            <Avatar 
                              alt={c.name}
                              className="w-6 h-6" 
                              src={`https://flagcdn.com/${c.code.toLowerCase()}.svg`}
                            />
                          }
                        >
                          { c.name }
                        </SelectItem>
                      )
                    }
                  </Field>

                  <Field 
                    as={Select}
                    variant="bordered"
                    name="state" 
                    color={formik.touched.state && formik.errors.state ? "danger" : ""}
                    label="Provincia" 
                    selectedKeys={[formik.values.state]}
                    defaultSelectedKeys={[formik.values.state]}
                    validationState={formik.touched.state && formik.errors.state ? "error" : ""}
                    errorMessage={formik.touched.state && formik.errors.state && formik.errors.state}
                  >
                    {
                      states.data.map( s => 
                        <SelectItem 
                          key={s.id} 
                          value={s.name} 
                        >

                          { s.name }
                        </SelectItem>
                      )
                    }
                  </Field>

                  <Field 
                    as={Input}
                    variant="bordered"
                    name="city" 
                    label="Ciudad" 
                    color={formik.touched.city && formik.errors.city ? "danger" : ""}
                    validationState={formik.touched.city && formik.errors.city}
                    errorMessage={formik.touched.city && formik.errors.city && formik.errors.city}
                    description={
                      <p className='text-end'>Podes obtener tu ubicacion automaticamente</p>
                    }
                    de
                    endContent={
                      <Button 
                        isIconOnly
                        className="bg-default/50 hover:bg-default/80 text-foreground cursor-pointer"
                        onClick={handleLocation}
                      >
                        {
                          location.isLoading
                          ? <Spinner size='sm' color="current" />
                          : <MdPlace className="text-lg" />
                        }
                      </Button>
                    }
                  />

                  <p>Metodos de contacto</p>
                  <Divider />
                  <FieldArray name="contact_methods" >
                    {
                      props => 
                        <div className='flex gap-2 flex-col'>
                          {
                            props.form.values.contact_methods.map((_, index) => (
                              <div 
                                key={index} 
                                className='flex gap-2'
                              >
                                <Field
                                  name={`contact_methods.${index}.method`}
                                  as={Select}
                                  className='w-3/5'
                                  label="Metodo"
                                  variant="bordered"
                                  color={formik.touched.contact_methods?.[index]?.method && (formik.errors.contact_methods?.[index] as { method: string })?.method ? "danger" : ""}
                                  errorMessage={formik.touched.contact_methods?.[index]?.method && (formik.errors.contact_methods?.[index] as { method: string })?.method && (formik.errors.contact_methods?.[index] as { method: string })?.method}
                                  validationState={formik.touched.contact_methods?.[index]?.method && (formik.errors.contact_methods?.[index] as { method: string })?.method}
                                  classNames={{
                                    popover: 'min-w-max'
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(`contact_methods.${index}.method`, e.target.value)
                                    formik.setFieldValue(`contact_methods.${index}.value`, '')
                                    formik.setFieldTouched(`contact_methods.${index}.value`, false)
                                  }}

                                >
                                  {
                                    methods.map(m => 
                                      <SelectItem 
                                        key={m.value} 
                                        value={m.value} 
                                        startContent={
                                          <Avatar 
                                            alt={m.label}
                                            className="w-6 h-6" 
                                            src={m.icon}
                                          />
                                        }
                                      >

                                        { m.label }
                                      </SelectItem>
                                    )
                                  }
                                </Field>
                                <Field 
                                  name={`contact_methods.${index}.value`}
                                  as={Input}
                                  variant="bordered"
                                  //@ts-ignore
                                  label={MethodLabels[formik.values.contact_methods[index].method] ?? 'Contacto'}
                                  color={formik.touched.contact_methods?.[index]?.value && (formik.errors.contact_methods?.[index] as { value: string })?.value ? "danger" : ""}
                                  errorMessage={formik.touched.contact_methods?.[index]?.value && (formik.errors.contact_methods?.[index] as { value: string })?.value && (formik.errors.contact_methods?.[index] as { value: string })?.value}
                                  validationState={formik.touched.contact_methods?.[index]?.value && (formik.errors.contact_methods?.[index] as { value: string })?.value}
                                />
                                <Button 
                                  isIconOnly 
                                  className={ `mt-1 ${ formik.values.contact_methods.length > 1 ? 'hover:bg-danger' : 'cursor-default' }` }
                                  size='lg'
                                  onClick={() => formik.values.contact_methods.length > 1 && props.remove(index)}
                                >
                                  <MdDelete />
                                </Button>
                              </div>
                            ))
                          }

                          <div className='flex justify-end mt-5'>
                            <Button 
                              onClick={() => props.push({method: '', value:''})} 
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
                  <Button variant="solid" color="primary" type="submit">
                    Guardar
                  </Button>
                </CardFooter>
              </>
            )
          }
        }
      </Formik>
    </Card>
  )


}
