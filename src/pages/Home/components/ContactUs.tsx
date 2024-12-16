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
              required
              minLength={1}
              placeholder="Enter your first name"
              className="outline-none text-secondary px-4 py-2 bg-transparent border-b border-white"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="lastName" className="text-lg">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              required
              minLength={1}
              placeholder="Enter your last name"
              className="outline-none text-secondary px-4 py-2 bg-transparent border-b border-white"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              id="email"
              type="text"
              required
              minLength={1}
              placeholder="Enter your email"
              className="outline-none text-secondary px-4 py-2 bg-transparent border-b border-white"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg">
            Description
          </label>
          <textarea
            id="description"
            placeholder="What you think?"
            minLength={1}
            maxLength={350}
            className="resize-none outline-none text-secondary px-1 h-44 md:h-36"
          />
        </div>
        <button className="bg-secondary px-4 py-2 hover:bg-secondaryHover">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
