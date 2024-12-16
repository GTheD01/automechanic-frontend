interface RepairServiceCard {
  img: string;
  alt: string;
  header: string;
  text: string;
}

function RepairServiceCard({ alt, header, img, text }: RepairServiceCard) {
  return (
    <div className="shadow-lg hover:-translate-y-4 transition">
      <img src={img} className="w-full" alt={alt} />
      <div className="px-2 py-4">
        <h3 className="text-primary text-xl font-medium">{header}</h3>
        <p className="mt-4 text-primary font-light sm:text-base text-sm">
          {text}
        </p>
      </div>
    </div>
  );
}

export default RepairServiceCard;
