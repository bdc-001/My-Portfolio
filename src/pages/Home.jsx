import Hero from "../components/Hero";
import About from "../components/About";
import Toolkit from "../components/Technologies";
import WorkList from "../components/WorkList";
import Beliefs from "../components/Beliefs";
import Testimonials from "../components/Testimonials";
import PersonalFAQ from "../components/PersonalFAQ";

const Home = () => {
    return (
        <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
            <div className="container mx-auto px-4 sm:px-6 md:px-8">
                <Hero />
                <About />
                <WorkList />
                <Beliefs />
                <Testimonials />
                <PersonalFAQ />
                <Toolkit />
            </div>
        </div>
    );
};

export default Home;
