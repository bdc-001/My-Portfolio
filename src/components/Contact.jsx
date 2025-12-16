import { CONTACT } from "../constants";
import { motion } from "framer-motion";

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

          <p className="text-xs text-neutral-400 mt-20">
            © {new Date().getFullYear()} Arsalaan Mohammed. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
