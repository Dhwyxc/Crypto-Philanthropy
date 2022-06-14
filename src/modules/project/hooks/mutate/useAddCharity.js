import axios from "axios";
import { useMutation } from "react-query";

const useAddCharity = (projectId) => {
  return useMutation(async (formData) => {
    const { data } = await axios.post(`/project/${projectId}/donate`, formData);
    return data;
  });
};

export default useAddCharity;
