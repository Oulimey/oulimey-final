import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["About", "Skills", "Experience", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio, video, and navigation container
  const audioElementRef = useRef(null);
  const videoRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar
      setIsNavVisible(true);
      // For mobile: don't remove floating-nav at top so navbar is fully visible
      if (!isMobile) {
        navContainerRef.current.classList.remove("floating-nav");
      } else {
        // For mobile: always keep floating-nav class even at the top
        navContainerRef.current.classList.add("floating-nav");
      }
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY, isMobile]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <nav
      ref={navContainerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo Video and Product button */}
        <div className="flex items-center">
          <video
            ref={videoRef}
            className="h-10 w-10 rounded-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/logo-animation.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Navigation Links and Audio Button */}
        <div className="flex items-center space-x-4">
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index} className="text-white hover:text-gray-300 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={toggleAudioIndicator}
            className="relative w-8 h-6 flex flex-col justify-between"
          >
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className={clsx(
                  "h-[2px] bg-white transition-all duration-500",
                  isIndicatorActive
                    ? "animate-audio-indicator"
                    : "w-full"
                )}
                style={{
                  animationDelay: `${bar * 0.1}s`,
                }}
              ></span>
            ))}
          </button>
        </div>
      </div>
      <audio ref={audioElementRef} src="/background-music.mp3" loop />
    </nav>
  );
};

export default NavBar;
