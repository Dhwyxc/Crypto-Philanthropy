import classNames from "classnames";
import React, { forwardRef } from "react";
const sizeMappingPadding = {
  xs: "px-3 py-2",
  sm: "px-4 py-3",
  md: "px-5 py-3",
  lg: "px-6 py-4",
  //   xl: "max-w-xl",
  //   "2xl": "max-w-2xl",
  //   "3xl": "max-w-3xl",
  //   "4xl": "max-w-4xl",
  //   "5xl": "max-w-5xl",
  //   "6xl": "max-w-6xl",
};
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName: string;
  sizeVarriant?: keyof typeof sizeMappingPadding;
  optional: boolean;
}
const Input = (
  {
    sizeVarriant = "sm",
    className,
    label,
    containerClassName,
    optional,
    ...rest
  }: Props,
  ref
) => {
  const s = sizeMappingPadding?.[sizeVarriant];
  return (
    <div className="w-full space-y-1">
      {label && (
        <div>
          <span className="font-medium text-sm text-gray-200">{label}</span>
          {optional && (
            <span className="text-[#537280] text-sm font-medium">
              {" "}
              (optional)
            </span>
          )}
        </div>
      )}
      <input
        {...rest}
        ref={ref}
        className={classNames("custom-input", s, className)}
      />
    </div>
  );
};

export default forwardRef(Input);
