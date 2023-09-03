
export const parseError = (error: any) => {

  let res: string;

  try{
    res = Object.values(error?.response?.data).map(x => x[0]).join(', ')
  } catch {
    res = ''
  }

  return res

}
