import React from "react";

interface AppointmentFieldProps {
  field: string;
  content: string | number;
  [key: string]: any;
}

const AppointmentField = React.memo(
  ({ field, content, ...props }: AppointmentFieldProps) => {
    return (
      <div {...props}>
        <p className="font-semibold">{field}:</p>
        <p className="font-light">{content}</p>
      </div>
    );
  }
);

export default AppointmentField;
