import Hero from "../components/Hero";
import About from "../components/About";
import Toolkit from "../components/Technologies";
import WorkList from "../components/WorkList";
import Beliefs from "../components/Beliefs";
import Testimonials from "../components/Testimonials";
import PersonalFAQ from "../components/PersonalFAQ";

const Home = () => {
    return (
        <div className="overflow-x-hidden">
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
