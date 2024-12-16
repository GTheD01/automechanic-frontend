import StarRating from "./StarRating";

interface CustomerReviewCardProps {
  img: string;
  alt: string;
  userFullname: string;
  userLocation: string;
  userRating: number;
  reviewContent: string;
}

function CustomerReviewCard({
  img,
  alt,
  reviewContent,
  userFullname,
  userLocation,
  userRating,
}: CustomerReviewCardProps) {
  return (
    <div className="bg-sky-50 p-4">
      <div className="flex flex-col gap-2 items-center justify-center">
        <img src={img} alt={alt} className="w-20 h-20 rounded-full" />
        <h4 className="text-xl font-extrabold">{userFullname}</h4>
        <span>{userLocation}</span>
        <StarRating rating={userRating} />
        <p className="text-center text-sm sm:text-base">{reviewContent}</p>
      </div>
    </div>
  );
}

export default CustomerReviewCard;
