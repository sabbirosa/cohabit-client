import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaTwitter } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
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
    icon: <MdOutlineMailOutline className="h-5 w-5 mr-2" />,
    text: "support@cohabit.com",
  },
  {
    icon: <FiPhone className="h-5 w-5 mr-2" />,
    text: "+1 (555) 123-4567",
  },
  {
    icon: <FaMapMarkerAlt className="h-5 w-5 mr-2" />,
    text: "123 Cohabit Street, Roommate City, RC 12345",
  },
];

function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10">
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

        <div className="mt-8 border-t border-primary/10 pt-8 text-center">
          <p className="text-sm text-base-content/60">
            © {new Date().getFullYear()} Cohabit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;