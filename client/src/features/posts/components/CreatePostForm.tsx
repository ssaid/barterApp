import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Card, CardHeader, CardBody, CardFooter, Input, Button, Divider, Select, SelectItem, Textarea, Chip} from "@nextui-org/react";
import { Post, Category } from '../../../types/post';
import { DragAndDropFiles } from './DragAndDropFiles';
import { ImageUploadPreview } from './ImageUploadPreview';
import { useMemo } from 'react';

const initialValues: Post = {
  title: '',
  description: '',
  state: 'active',
  images: [] as File[],
  image_ppal: '',
  interactions: 0,
  post_categories: []

}


const validationSchema = Yup.object({
  title: Yup.string().required('Este campo es requerido'),
  description: Yup.string().required('Este campo es requerido'),
  images: Yup.array().of(Yup.string()).required('Debe agregar al menos una imagen'),
  post_categories: Yup.array().of(Yup.string()).min(1, 'Debe seleccionar al menos una categoria')

})

export const CreatePostForm = () => {

  const categories: Category[] = [
    { id: 1, name: 'Arte' },
    { id: 2, name: 'Automoviles' },
    { id: 3, name: 'Indumentaria' }
  ]



  return (
    <Card className="max-w-3xl w-full py-5">
      <CardHeader className='ml-3 justify-center text-lg'>Crear un post</CardHeader>
      <Divider className='my-3'/>
      <Formik
        initialValues={initialValues}
        onSubmit={console.log}
        validationSchema={validationSchema}
      >
        {
          formik => {

            const images = useMemo(() => {
              return formik.values.images.map(URL.createObjectURL)
            }, [formik.values.images]);

            return (
              <Form>
                <CardBody className='flex flex-col gap-3'>
                  <Field 
                    as={Input}
                    variant="bordered"
                    name="title" 
                    type="title" 
                    color={formik.touched.title && formik.errors.title ? "danger" : ""}
                    label="Titulo" 
                    validationState={formik.touched.title && formik.errors.title ? "error" : ""}
                    errorMessage={formik.touched.title && formik.errors.title && formik.errors.title}
                  />
                  <Field 
                    as={Textarea}
                    variant="bordered"
                    name="description" 
                    type="description" 
                    color={formik.touched.description && formik.errors.description ? "danger" : ""}
                    label="Descripcion" 
                    validationState={formik.touched.description && formik.errors.description ? "error" : ""}
                    errorMessage={formik.touched.description && formik.errors.description && formik.errors.description}
                  />
                  <Field name="post_categories">
                    {
                      ({ field, form, meta }) =>
                        <Select
                          label="Categorias"
                          items={categories}
                          selectionMode="multiple"
                          placeholder="Selecciona una o mas categorias"
                          color={meta.touched && meta.error ? "danger" : "default"}
                          errorMessage={meta.touched && meta.error && meta.error}
                          value={field.value}
                          onChange={ e => form.setFieldValue('post_categories', e.target.value ? e.target.value.split(',') : []) }
                          variant='bordered'
                          classNames={{
                            label: 'py-2',
                            trigger: "min-h-unit-12 h-full py-2",
                          }}
                          renderValue={
                            items =>
                              <div className="flex flex-wrap gap-2">
                                {
                                  items.map(item => 
                                    <Chip key={item.key}>{ item.data.name }</Chip>
                                  )
                                }
                              </div>
                          }
                        >
                          {
                            category => 
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                          }
                        </Select>
                    }
                  </Field>


                  <div className='flex items-center justify-center gap-3 flex-col sm:flex-row'>
                    <DragAndDropFiles
                      files={formik.values.images}
                      accept={["image/*"]}
                      onChange={files => formik.setFieldValue("images", files)}
                    />
                  </div>
                  <div className="flex flex-row gap-3 m-w-full overflow-auto p-3">
                    {
                      images.map( (image: any, idx: any) => 
                        <ImageUploadPreview 
                          key={idx}
                          img={image}
                          onClick={() =>
                            formik.setFieldValue('images', [...formik.values.images.filter((_, i: number) => i !== idx)]) 
                          }
                        />
                      )
                    }
                  </div>
                </CardBody>
                <CardFooter className="justify-end px-5">
                  <Button variant="solid" color="primary" type="submit">
                    Continuar
                  </Button>
                </CardFooter>
              </Form>
            )
          }
        }

      </Formik>
    </Card>
  )


}
