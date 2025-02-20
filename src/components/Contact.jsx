import { Mail, Phone } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-cream-50 sm:overflow-hidden">
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-150"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">Join Oulimey</p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild your <br /> new digit<b>a</b>l <br /> world t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <div className="relative group">
            <Button title="contact us" containerClass="mt-10 cursor-pointer" />
            
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-cream-50" />
                    <a
                      href="mailto:oulimeyounes@gmail.com"
                      className="text-sm text-cream-50 hover:text-white"
                    >
                      oulimeyounes@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-cream-50" />
                    <a
                      href="tel:+212652756195"
                      className="text-sm text-cream-50 hover:text-white"
                    >
                      +212 652 756 195
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;