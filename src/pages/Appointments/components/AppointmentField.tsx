interface AppointmentFieldProps {
  field: string;
  content: string | number;
  [key: string]: any;
}

function AppointmentField({ field, content, ...props }: AppointmentFieldProps) {
  return (
    <div {...props}>
      <p className="font-semibold">{field}:</p>
      <p className="font-light">{content}</p>
    </div>
  );
}

export default AppointmentField;
