import url from 'url';

const objectToPostParam = (input: { [k: string]: unknown }): string => {
  const params = input;
  // Filter properties which have undefined value.
  Object.keys(params)
    .forEach((k: string) => (params[k] === undefined && delete params[k]));
  // Assume that params has key as string, and value as string.
  const postParams = new url.URLSearchParams(params as { [k: string]: string });
  // Return post param string.
  return postParams.toString();
};

const arrayToPostParam = (key: string, input: string[]) => {
  const params: [string, string][] = input.map((i: string) => [key, i]);
  const postParams = new url.URLSearchParams(params);
  return postParams.toString();
};

export default { objectToPostParam, arrayToPostParam };
