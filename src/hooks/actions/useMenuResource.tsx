import React from 'react';
import useFetch from '../useFetch';

const useEditMenuResource = () => {
  const { fetchData: editMenuResource, loading, error, data } = useFetch('', true, true);
  return { editMenuResource, loading, error, data };
};

export { useEditMenuResource };
