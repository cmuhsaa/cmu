import { getLinksContent } from "@/lib/getDatas";
import Link from "next/link";
import { FaFacebook, FaYoutube, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

const Footer = async () => {
  const { data } = await getLinksContent();

  if (!data) return null;

  const {
    socialLinks,
    address,
    email,
    phonePresident,
    phoneSecretary,
    formation,
  } = JSON.parse(JSON.stringify(data));

  return (
    <footer className="bg-gradient-to-r from-orange-600 to-red-600 shadow-xl text-white px-6 py-10 mt-4 lg:mt-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">যোগাযোগ</h3>
          <p className="mb-2">{address}</p>
          <p className="mb-1">
            📧{" "}
            <a href={`mailto:${email}`} className="hover:text-blue-400">
              {email}
            </a>
          </p>
          <p className="mb-1">
            👤 সভাপতি:{" "}
            <a href={`tel:${phonePresident}`} className="hover:text-blue-400">
              {phonePresident}
            </a>
          </p>
          <p>
            👤 সম্পাদক:{" "}
            <a href={`tel:${phoneSecretary}`} className="hover:text-blue-400">
              {phoneSecretary}
            </a>
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            সোশ্যাল মিডিয়া
          </h3>
          <ul className="space-y-3">
            {socialLinks?.facebook && (
              <li>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                >
                  <FaFacebook /> Facebook
                </a>
              </li>
            )}
            {socialLinks?.youtube && (
              <li>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <FaYoutube /> YouTube
                </a>
              </li>
            )}
            {socialLinks?.whatsapp && (
              <li>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-green-400 transition-colors"
                >
                  <FaWhatsapp /> WhatsApp
                </a>
              </li>
            )}
            {socialLinks?.twitter && (
              <li>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <FaXTwitter /> Twitter (X)
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* About CMU */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-white">
            CMU সম্পর্কে
          </h3>
          <p className="mb-4 text-sm leading-relaxed">
            {formation?.slice(0, 200)}...
          </p>
          <Link
            href="/introduction"
            className="inline-block text-blue-200 hover:underline hover:text-blue-300"
          >
            বিস্তারিত দেখুন →
          </Link>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-300 border-t border-gray-700 pt-6">
        &copy; {new Date().getFullYear()} CMU. সর্বস্বত্ব সংরক্ষিত।
      </div>
    </footer>
  );
};

export default Footer;
