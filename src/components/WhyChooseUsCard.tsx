interface WhyChooseUsCardProps {
  img: string;
  alt: string;
  header: string;
  text: string;
}

function WhyChooseUsCard({ header, img, text, alt }: WhyChooseUsCardProps) {
  return (
    <div className="space-y-4">
      <img src={img} alt={alt} loading="lazy" />
      <h2 className="text-2xl font-medium text-primary">{header}</h2>
      <p className="text-primary font-light">{text}</p>
    </div>
  );
}

export default WhyChooseUsCard;
