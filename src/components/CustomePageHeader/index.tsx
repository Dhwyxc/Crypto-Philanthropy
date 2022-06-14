import { Breadcrumb, PageHeader } from "antd";
import React, { useMemo } from "react";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";
interface BreadCrumb {
  title: string;
  link: string;
}
interface PropsPageHeader {
  title: string;
  breadcrumb: BreadCrumb[];
  onBack: Function;
  extra: React.ReactNode;
}
const CustomePageHeader = ({
  title,
  breadcrumb,
  onBack,
  extra,
}: PropsPageHeader) => {
  // const navigator = useNavigate();
  // const history = useHistory();
  const bc = useMemo(() => {
    return breadcrumb?.map((e, i) => {
      return (
        <Breadcrumb.Item>
          {e?.link ? <Link to={e?.link}>{e?.title}</Link> : e?.title}
        </Breadcrumb.Item>
      );
    });
  }, [breadcrumb]);
  return (
    <PageHeader
      className="!pt-0 !pl-0"
      title={title}
      extra={extra}
      onBack={onBack ? onBack : () => {}}
      breadcrumb={<Breadcrumb>{bc}</Breadcrumb>}
    />
  );
};

export default CustomePageHeader;
