function StarRating({ rating }: { rating: number }) {
  if (!rating) {
    rating = 0;
  }

  const fullStars = Math.floor(rating);
  const decimalStarRating = rating % 1;
  const emptyStars = 5 - fullStars - (decimalStarRating > 0 ? 1 : 0);

  return (
    <div className="flex text-2xl">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, idx) => (
        <div key={`full-${idx}`} className="relative text-blue-400">
          <span>★</span>
        </div>
      ))}

      {/* Decimal (half) star */}
      {decimalStarRating > 0 && (
        <div key="half" className="relative text-blue-400">
          <span
            style={{ width: `${decimalStarRating * 100}%` }}
            className="absolute overflow-hidden text-gray-300"
          >
            ★
          </span>
          <span className="text-yellow-400">★</span>
        </div>
      )}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, idx) => (
        <div key={`empty-${idx}`} className="relative text-gray-300">
          <span>★</span>
        </div>
      ))}
    </div>
  );
}

export default StarRating;
