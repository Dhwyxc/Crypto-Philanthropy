import CustomePageHeader from "@components/CustomePageHeader";
import React from "react";
import { Link } from "react-router-dom";
import CardProject from "../components/CardProject";
import useGetProject from "../hooks/query/useGetProject";

const ProjectHome = () => {
  const { data: project } = useGetProject();
  const data = [
    {
      id: 1,
      name: "Ủng hộ lũ miền Trung",
      desc: " hưởng ứng Lời kêu gọi của Ủy ban MTTQ Việt Nam tỉnh Lạng Sơn về việc “Toàn dân tham gia ủng hộ các tỉnh miền",
      img: "https://vff.org.vn/wp-content/uploads/2020/10/huong-ve-mien-trung-696x430.png",
    },
    {
      id: 2,
      name: "Ủng hộ Vacxin covid",
      desc: "Mọi sự ủng hộ của người dân xin gửi vào tài khoản “Quỹ vắc-xin phòng chống Covid-19” bằng cách nhập đầy đủ thông tin vào bảng",
      img: "https://suckhoedoisong.qltns.mediacdn.vn/324455921873985536/2021/9/26/can-bo-y-te-25-1632614618227806018683.jpeg",
    },
  ];
  return (
    <>
      <CustomePageHeader
        title={`Tất cả dự án`}
        breadcrumb={[
          {
            title: "Trang chủ",
            link: "/",
          },
          {
            title: "Dự án",
            link: "/webs",
          },
        ]}
      />
      <div className="grid grid-cols-4 gap-2">
        {project?.map((e, i) => {
          return (
            //   <Link className="block" key={i} to={"/project/" + i}>
            <CardProject key={i} {...e} />
            //   </Link>
          );
        })}
      </div>
    </>
  );
};

export default ProjectHome;
