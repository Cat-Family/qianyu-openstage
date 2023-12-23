import React from 'react';
import useFetch from '../useFetch';

const useEditMenuResource = () => {
  const { fetchData: editMenuResource, loading, error } = useFetch();
  return { editMenuResource, loading, error };
};

export { useEditMenuResource };
