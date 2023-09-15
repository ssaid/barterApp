

type Params = {
  [key: string]: string | undefined | null;
};

export const parseURLParams = (params: Params): URLSearchParams => {

  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) urlParams.append(key, value);
  })

  return urlParams
}
