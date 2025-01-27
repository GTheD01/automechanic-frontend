import React from "react";

interface UserFieldProps {
  field: string;
  content: string | number;
  [key: string]: any;
}

const UserField = React.memo(({ field, content, ...props }: UserFieldProps) => {
  return (
    <div {...props}>
      <p className="font-semibold border-b-2 w-fit text-sm md:text-base">
        {field}
      </p>
      <p className="text-sm lg:text-base">{content}</p>
    </div>
  );
});

export default UserField;
