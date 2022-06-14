import axios from "axios";
import { useQuery } from "react-query";

const useGetProject = () => {
  return useQuery(["projects"], async () => {
    const { data } = await axios.get("/project");
    return data;
  });
};

export default useGetProject;
