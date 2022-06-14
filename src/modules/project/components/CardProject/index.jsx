import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const { Meta } = Card;
const CardProject = ({ name, desc, logo, _id }) => {
  return (
    <Card hoverable cover={<img alt="example" src={logo} />}>
      <Link to={`/project/${_id}`}>
        <Meta title={name} description={desc} />
      </Link>
    </Card>
  );
};

export default CardProject;
