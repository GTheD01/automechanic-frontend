import Button from "@/components/common/Button";

function ContactUs() {
  return (
    <div id="contact" className="bg-primary mt-20 px-4 lg:py-10 lg:px-28 pt-4">
      <h2 className="text-white text-4xl text-center font-semibold">
        Contact Us
      </h2>
      <form className="space-y-4 p-4">
        <div className="flex flex-wrap gap-4 md:justify-between sm:mt-8">
          <div className="flex flex-col items-start">
            <label htmlFor="firstName" className="text-lg">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="off"
              required
              minLength={1}
              placeholder="Enter your first name"
              className="outline-none text-white px-4 py-2 bg-transparent border border-white placeholder:text-neutral"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="lastName" className="text-lg">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="off"
              required
              minLength={1}
              placeholder="Enter your last name"
              className="outline-none text-white px-4 py-2 bg-transparent border border-white placeholder:text-neutral"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              id="email"
              type="text"
              autoComplete="off"
              required
              minLength={1}
              placeholder="Enter your email"
              className="outline-none text-white px-4 py-2 bg-transparent border border-white placeholder:text-neutral"
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            id="description"
            placeholder="What you think?"
            minLength={1}
            maxLength={350}
            className="resize-none outline-none text-black p-1 h-44 md:h-36 w-4/5 mb-2 max-w-[700px]"
          />
          <Button className="py-2 px-4">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ContactUs;
