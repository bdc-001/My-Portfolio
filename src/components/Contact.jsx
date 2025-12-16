import { CONTACT } from "../constants";
import { motion } from "framer-motion";
import { FaLinkedin, FaYoutube } from "react-icons/fa";

const Contact = () => {
  return (
    <div id="contact" className="border-b border-neutral-100 pb-20 pt-20">
      <div className="text-center tracking-tighter">
        <motion.h2
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="my-10 text-center text-4xl lg:text-6xl font-bold text-primary tracking-tight"
        >
          Let's build something bold.
        </motion.h2>

        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-xl text-secondary">
            Ready to maximize your product's potential?
          </p>
          <a href={`mailto:${CONTACT.email}`} className="text-2xl lg:text-3xl font-medium text-primary hover:text-purple-600 transition-colors border-b-2 border-transparent hover:border-purple-600 pb-1">
            {CONTACT.email}
          </a>
          <div className="flex gap-4 mt-8 text-secondary text-sm">
            <span>{CONTACT.address}</span>
          </div>

          {/* Social Links */}
          <div className="mt-12 pt-8 border-t border-neutral-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary mb-2">Let's Connect</h3>
              <p className="text-neutral-600">Follow my journey on LinkedIn and YouTube</p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/arsalaan-pm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 border border-neutral-200 bg-white text-neutral-700 font-medium rounded-xl hover:border-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all shadow-sm group"
              >
                <FaLinkedin className="text-xl text-[#0077B5] group-hover:text-white transition-colors" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.youtube.com/@ArsalaanMd25"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 border border-neutral-200 bg-white text-neutral-700 font-medium rounded-xl hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition-all shadow-sm group"
              >
                <FaYoutube className="text-xl text-[#FF0000] group-hover:text-white transition-colors" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          <p className="text-xs text-neutral-400 mt-20">
            © {new Date().getFullYear()} Arsalaan Mohammed. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
