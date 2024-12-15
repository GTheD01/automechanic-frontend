import ArrowIcon from "./ArrowIcon";
import CustomerReviewCard from "./CustomerReviewCard";

import userProfile from "../assets/images/user-profile.png";

function CustomerReviews() {
  return (
    <section className="text-primary pt-36 px-28 mb-16">
      <h2 className="text-4xl font-semibold text-center">
        What Our Happy Clients Say About Our Services
      </h2>
      <div className="flex gap-8 mt-12">
        <CustomerReviewCard
          img={userProfile}
          alt="user picture"
          reviewContent="The team was friendly and knowledgeable, and they were able to diagnose and fix the issue quickly and affordably. I appreciated the pricing and the clear communication throughout the process. I would definitely recommend to anyone."
          userFullname="Shan Williams"
          userLocation="Newport Beach, CA"
          userRating={4}
        />
        <CustomerReviewCard
          img={userProfile}
          alt="user picture"
          reviewContent="The team was friendly and knowledgeable, and they were able to diagnose and fix the issue quickly and affordably. I appreciated the pricing and the clear communication throughout the process. I would definitely recommend to anyone."
          userFullname="Shan Williams"
          userLocation="Newport Beach, CA"
          userRating={4}
        />
        <CustomerReviewCard
          img={userProfile}
          alt="user picture"
          reviewContent="The team was friendly and knowledgeable, and they were able to diagnose and fix the issue quickly and affordably. I appreciated the pricing and the clear communication throughout the process. I would definitely recommend to anyone."
          userFullname="Shan Williams"
          userLocation="Newport Beach, CA"
          userRating={4}
        />
      </div>
      <div className="flex items-center justify-center gap-4 pt-10">
        <ArrowIcon arrowDirection="left" />
        <ArrowIcon arrowDirection="right" />
      </div>
    </section>
  );
}

export default CustomerReviews;
