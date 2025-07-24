
import { FiTwitter, FiFacebook, FiInstagram, FiGithub } from "react-icons/fi";
import Logo from "../assets/logo.png"; // assuming your logo is a png image
import image from '../assets/bg4.jpg';
const Footer = () => {
  const iconStyles =
    "flex items-center justify-center text-white transition-all duration-200 bg-transparent border border-gray-700 rounded-full w-7 h-7 focus:bg-blue-600 hover:bg-blue-600 hover:border-blue-600 focus:border-blue-600";
  const linkClasses =
    " text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80 cursor-pointer";

  return (
    <section className="relative py-10 bg-gradient-to-b from-[#101726] to-[#000000] sm:pt-16 lg:pt-24">

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="absolute inset-0">
    <div className="absolute inset-0 bg-cover bg-center opacity-10"  style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute top-1/4 right-1/4 w-64 h-44 bg-blue-500/30 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-44 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
    </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-12">
          {/* Company */}
          <div>
            <p className="text-base text-gray-500">Company</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "/about", text: "About" },
                { href: "/features", text: "Features" },
                { href: "/works", text: "Works" },
                { href: "/career", text: "Career" },
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href}>
                    <span className={linkClasses}>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="text-base text-gray-500">Help</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "/support", text: "Customer Support" },
                { href: "/delivery", text: "Delivery Details" },
                { href: "/terms", text: "Terms & Conditions" },
                { href: "/privacy", text: "Privacy Policy" },
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href}>
                    <span  className={ `${linkClasses} `}>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-base text-gray-500">Resources</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "/ebooks", text: "Free eBooks" },
                { href: "/tutorial", text: "Development Tutorial" },
                { href: "/blog", text: "How to - Blog" },
                { href: "/youtube", text: "YouTube Playlist" },
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href}>
                    <span className={linkClasses}>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra Links */}
          <div>
            <p className="text-base text-gray-500">Extra Links</p>
            <ul className="mt-8 space-y-4">
              {[
                { href: "/faq", text: "FAQ" },
                { href: "/partners", text: "Partners" },
                { href: "/affiliate", text: "Affiliate Program" },
                { href: "/contact", text: "Contact Us" },
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.href}>
                    <span className={linkClasses}>{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-800" />

        <div className="flex flex-wrap items-center justify-between">
          {/* Logo */}
          <img
            src={Logo}
            alt="Ai Resume Builder Logo"
            className="h-8 w-auto md:order-1"
            height={200}
            width={200}
          />

          {/* Social Icons */}
          <ul className="flex items-center space-x-3 md:order-3">
            {[
              {
                icon: <FiTwitter className="w-4 h-4" />,
                href: "https://twitter.com",
              },
              {
                icon: <FiFacebook className="w-4 h-4" />,
                href: "https://facebook.com",
              },
              {
                icon: <FiInstagram className="w-4 h-4" />,
                href: "https://instagram.com",
              },
              {
                icon: <FiGithub className="w-4 h-4" />,
                href: "https://github.com/SumitSingh6122",
              },
            ].map((item, index) => (
              <li key={index} className=" z-50 relative">
                <a href={item?.href} target="_blank" rel="noopener noreferrer" >
                <div  className={`${iconStyles} hover:text-[#0ef] hover:bg-transparent`}>{item.icon}</div>

                </a>
              </li>
            ))}
          </ul>

          <p className="w-full mt-8 text-sm text-center text-gray-100 md:mt-0 md:w-auto md:order-2">
            © Copyright 2025, All Rights Reserved by Ai Resume Builder
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
