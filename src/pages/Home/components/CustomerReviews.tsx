import CustomerReviewCard from "@/components/CustomerReviewCard";

import userProfile from "@/assets/images/user-profile.webp";

function CustomerReviews() {
  return (
    <section className="text-primary pt-36 sm:px-28 px-4 mb-16">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-center">
        What Our Satisfied Customers Have to Say
      </h2>
      <div className="flex gap-8 flex-col lg:flex-row mt-12">
        <CustomerReviewCard
          img={userProfile}
          alt="user picture"
          reviewContent="The service was exceptional! The team was professional, efficient, and transparent about the work needed. They fixed my car in no time and at a fair price. I’m really impressed with the level of care and attention to detail. Highly recommend!"
          userFullname="Alexandra Miller"
          userLocation="Geneva, GE"
          userRating={5}
        />
        <CustomerReviewCard
          img={userProfile}
          alt="user picture"
          reviewContent="I had a great experience with this auto service center. The staff was friendly, and they took the time to explain everything to me. They diagnosed the problem quickly and offered an affordable solution. My car is running like new again! Highly recommend!"
          userFullname="John Roberts"
          userLocation="Basel, BS"
          userRating={5}
        />
        <CustomerReviewCard
          img={userProfile}
          alt="user picture"
          reviewContent="Excellent service! The technicians were knowledgeable and efficient, and they completed the repair ahead of schedule. I’m very satisfied with the quality of work and the pricing. Will definitely return for future maintenance!"
          userFullname="Lucerne, LU"
          userLocation="Zurich, ZH"
          userRating={5}
        />
      </div>
    </section>
  );
}

export default CustomerReviews;
