import { Link } from "react-router-dom";

import mailSvg from "@/assets/svgs/mail.svg";
import phoneSvg from "@/assets/svgs/phone.svg";
import instagramSvg from "@/assets/svgs/instagram.svg";
import facebookSvg from "@/assets/svgs/facebook.svg";
import linkedinSvg from "@/assets/svgs/linkedin.svg";

function Footer() {
  return (
    <footer className="sm:px-28 px-16 bg-primary pt-8">
      <div className="flex gap-8 justify-between mb-12 flex-wrap">
        <div>
          <h3 className="text-xl mb-3">Our Working Hours</h3>
          <div className="*:text-neutral space-y-1 text-xs sm:text-sm">
            <p>Monday - 08am-10pm</p>
            <p>Tuesday - 09am-10pm</p>
            <p>Wednesday - 08am-09pm</p>
            <p>Thursday - 09am-07pm</p>
            <p>Friday - 10am-05pm</p>
            <p>Saturday - 11am-06pm</p>
            <p>Sunday - Closed</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-3">Company</h3>
          <div className="*:text-neutral space-y-1 flex flex-col">
            <Link to={""} className="hover:text-gray-400">
              About Us
            </Link>
            <Link to={""} className="hover:text-gray-400">
              Services
            </Link>
            <Link to={""} className="hover:text-gray-400">
              Reviews
            </Link>
            <Link to={""} className="hover:text-gray-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-3">Contact Us</h3>
          <div className="*:text-neutral">
            <p className="flex items-center">
              <img src={phoneSvg} alt="phone" className="w-5" />
              <span>+41 23 123 55 12</span>
            </p>
            <a
              href="mailto:automechanicsupp@gmail.com"
              className="flex items-center hover:text-gray-400"
            >
              <img src={mailSvg} alt="mail" className="w-5" />
              <p>automechanicsupp@gmail.com</p>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-3">Locations</h3>
          <p className="text-neutral">Wettingen</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between text-neutral pb-4">
        <span>&copy; Automechanic Services. All rights reserved.</span>
        <div className="flex gap-4 items-center">
          <Link to={""} className="hover:scale-110">
            <img src={facebookSvg} alt="facebook logo" className="w-6" />
          </Link>
          <Link to={""} className="hover:scale-110">
            <img src={instagramSvg} alt="instagram logo" className="w-6" />
          </Link>
          <Link to={""} className="hover:scale-110">
            <img src={linkedinSvg} alt="linkedin logo" className="w-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
