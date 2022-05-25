import classNames from "classnames";
import React, { forwardRef, ReactElement } from "react";
// import { HashLoader } from "react-spinners";
interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactElement;
  loading: boolean;
  endIcon: ReactElement;
}
const IconButton = (
  { loading = false, icon, className, endIcon, children, ...rest }: Props,
  ref
) => {
  return (
    <button
      ref={ref}
      className={classNames("icon-button", className)}
      {...rest}
    >
      {/* {loading ? <HashLoader size={18} /> : icon} */}
      {icon}
      {children && <span>{children}</span>}
      {endIcon}
    </button>
  );
};

export default forwardRef(IconButton);
