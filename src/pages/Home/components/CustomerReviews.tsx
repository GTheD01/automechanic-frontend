import userProfile from "@/assets/images/user-profile.png";
import CustomerReviewCard from "@/components/CustomerReviewCard";

function CustomerReviews() {
  return (
    <section className="text-primary pt-36 sm:px-28 px-4 mb-16">
      <h2 className="lg:text-4xl md:text-3xl text-2xl font-semibold text-center">
        What Our Happy Clients Say About Our Services
      </h2>
      <div className="flex gap-8 flex-col lg:flex-row mt-12">
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
    </section>
  );
}

export default CustomerReviews;
