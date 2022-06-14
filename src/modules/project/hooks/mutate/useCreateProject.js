import axios from "axios";
import { useMutation } from "react-query";

const useCreateProject = () => {
  return useMutation(async (formData) => {
    const { data } = await axios.post("/project", formData);
    return data;
  });
};

export default useCreateProject;
