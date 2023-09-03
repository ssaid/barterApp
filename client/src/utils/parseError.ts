
export const parseError = (error: any): string => {

  let res: string;

  try{

    if (error?.response?.data?.detail) {
      return error?.response?.data?.detail
    }
    res = Object.values(error?.response?.data).map(x => x[0]).join(', ')

  } catch {
    res = ''
  }

  return res

}
