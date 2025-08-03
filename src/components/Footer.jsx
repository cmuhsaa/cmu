// app/components/Footer.tsx
import { getLinksContent } from "@/lib/getDatas";
import Link from "next/link";
import React from "react";

const Footer = async () => {
  const { data } = await getLinksContent();

  if (!data) return null;

  const { socialLinks, address, email, phonePresident, phoneSecretary } = data;

  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <p>{address}</p>
          <p>
            Email:{" "}
            <a href={`mailto:${email}`} className="underline">
              {email}
            </a>
          </p>
          <p>
            President:{" "}
            <a href={`tel:${phonePresident}`} className="underline">
              {phonePresident}
            </a>
          </p>
          <p>
            Secretary:{" "}
            <a href={`tel:${phoneSecretary}`} className="underline">
              {phoneSecretary}
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Social Media</h3>
          <ul className="space-y-1">
            {socialLinks?.facebook && (
              <li>
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Facebook
                </a>
              </li>
            )}
            {socialLinks?.youtube && (
              <li>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  YouTube
                </a>
              </li>
            )}
            {socialLinks?.whatsapp && (
              <li>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {socialLinks?.twitter && (
              <li>
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Twitter (X)
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">About CUAA</h3>
          <p>{data?.formation?.slice(0, 200)}...</p>
          <Link href={`/introduction`}>See more</Link>
        </div>
      </div>
      <div className="text-center mt-6 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} CUAA. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
