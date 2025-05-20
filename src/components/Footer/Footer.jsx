import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

const quickLinks = [
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "FAQ", path: "/faq" },
  { name: "About Us", path: "/about" },
];

const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: <FaFacebook className="text-xl" />,
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
    icon: <FaTwitter className="text-xl" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: <FaInstagram className="text-xl" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    icon: <FaLinkedin className="text-xl" />,
  },
];

const contactInfo = [
  {
    icon: (
      <svg
        className="h-5 w-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    text: "support@cohabit.com",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    text: "+1 (555) 123-4567",
  },
  {
    icon: (
      <svg
        className="h-5 w-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    text: "123 Cohabit Street, Roommate City, RC 12345",
  },
];

function Footer() {
  return (
    <footer className="bg-base-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-base-content">Contact Us</h3>
            <div className="space-y-2">
              {contactInfo.map((item, index) => (
                <p key={index} className="flex items-center text-base-content/80">
                  {item.icon}
                  {item.text}
                </p>
              ))}
            </div>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-base-content">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-base-content/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-base-content">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content/80 hover:text-primary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-base-content/10 pt-8 text-center">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} Cohabit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;