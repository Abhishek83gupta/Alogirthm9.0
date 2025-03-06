import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-[#1a2332] text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Prescripto</h2>
            <p className="text-sm text-gray-400 mb-4">
              Making healthcare accessible and convenient for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#3b82f6]">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3b82f6]">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3b82f6]">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#3b82f6]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#3b82f6]">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-[#3b82f6]"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-[#3b82f6]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center text-gray-400">
                <MdPhone className="mr-2" /> +1 234 567 8900
              </p>
              <p className="flex items-center text-gray-400">
                <MdEmail className="mr-2" /> contact@prescripto.com
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-400 mt-8 pt-8 border-t border-gray-700">
          <p>© {new Date().getFullYear()} Prescripto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;