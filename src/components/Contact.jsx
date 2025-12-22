import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="contact" className="border-b border-neutral-100 pb-12 sm:pb-16 md:pb-20 pt-12 sm:pt-16 md:pt-20">
      <div className="text-center tracking-tighter">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="my-6 sm:my-8 md:my-10 text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-primary tracking-tight px-4"
        >
          Let's build something bold.
        </motion.h2>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4 sm:gap-6"
        >
          <p className="text-base sm:text-lg md:text-xl text-secondary px-4">
            Ready to maximize your product's potential?
          </p>
          <a href={`mailto:${CONTACT.email}`} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-primary hover:text-purple-600 transition-colors border-b-2 border-transparent hover:border-purple-600 pb-1 break-all px-4">
            {CONTACT.email}
          </a>
          <div className="flex gap-4 mt-4 sm:mt-6 md:mt-8 text-secondary text-xs sm:text-sm px-4">
            <span>{CONTACT.address}</span>
          </div>

          {/* Social Links */}
          <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-neutral-100 w-full px-4">
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">Let's Connect</h3>
              <p className="text-sm sm:text-base text-neutral-600">Follow my journey on LinkedIn and YouTube</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
              <a
                href="https://www.linkedin.com/in/arsalaan-pm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 border border-neutral-200 bg-white text-neutral-700 text-sm sm:text-base font-medium rounded-xl hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all shadow-sm group"
              >
                <FaLinkedin className="text-lg sm:text-xl text-[#0077B5] group-hover:text-white transition-colors" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@ArsalaanMd25"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-4 sm:px-6 py-3 border border-neutral-200 bg-white text-neutral-700 text-sm sm:text-base font-medium rounded-xl hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all shadow-sm group"
              >
                <FaYoutube className="text-lg sm:text-xl text-[#FF0000] group-hover:text-white transition-colors" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 mt-12 sm:mt-16 md:mt-20">
            <a
              href="/Mohammed_Resume_2025.pdf"
              download="Arsalaan_Mohammed_Resume.pdf"
              className="text-sm font-semibold text-neutral-400 hover:text-purple-600 transition-colors flex items-center gap-2 group"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">💼</span>
              For the HODs & Hiring Managers
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">🤫</span>
            </a>
            <p className="text-xs text-neutral-400 px-4">
              © {new Date().getFullYear()} Arsalaan Mohammed. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
