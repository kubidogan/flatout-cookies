import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// ============================================
// DOOR HINGE PIVOTS (EASY TO TWEAK)
// ============================================
const LEFT_DOOR_HINGE = { x: "680px", y: "575px" }; // Left edge of left door
const RIGHT_DOOR_HINGE = { x: "1240px", y: "575px" }; // Right edge of right door

// Door hotspot positioning (viewport units for responsiveness)
const DOOR_HOTSPOT = {
  left: "38%",
  top: "22%",
  width: "24%",
  height: "62%",
};

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Set up door hinge pivots on mount
  useEffect(() => {
    const leftDoor = svgRef.current?.querySelector("#LeftDoor");
    const rightDoor = svgRef.current?.querySelector("#RightDoor");
    const interiorCookies = svgRef.current?.querySelector("#InteriorCookies");

    if (leftDoor) {
      gsap.set(leftDoor, {
        transformOrigin: `${LEFT_DOOR_HINGE.x} ${LEFT_DOOR_HINGE.y}`,
      });
    }

    if (rightDoor) {
      gsap.set(rightDoor, {
        transformOrigin: `${RIGHT_DOOR_HINGE.x} ${RIGHT_DOOR_HINGE.y}`,
      });
    }

    // Set initial state for interior cookies (subtle, will brighten on door open)
    if (interiorCookies) {
      gsap.set(interiorCookies, {
        opacity: 0.85,
        scale: 1,
        transformOrigin: "center center",
      });
    }

    // Prevent text selection during animations
    document.body.style.userSelect = "none";
    return () => {
      document.body.style.userSelect = "";
    };
  }, []);

  // Handle door click with animation
  const handleDoorClick = () => {
    if (isAnimating) return;

    console.log("🚪 Door clicked");
    setIsAnimating(true);

    if (prefersReducedMotion) {
      // Skip animation, just navigate
      setTimeout(() => {
        navigate("/shop");
      }, 250);
      return;
    }

    const leftDoor = svgRef.current?.querySelector("#LeftDoor");
    const rightDoor = svgRef.current?.querySelector("#RightDoor");
    const fadeOverlay = document.getElementById("fadeOverlay");
    const interiorCookies = svgRef.current?.querySelector("#InteriorCookies");

    if (!leftDoor || !rightDoor || !fadeOverlay || !wrapperRef.current) {
      // Fallback: navigate immediately if elements not found
      navigate("/shop");
      return;
    }

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        navigate("/shop");
      },
    });

    // Doors swing open (0.7s) + camera zoom (0.9s starting at 0.35s) + fade (0.25s starting at 1.25s)
    timeline
      .to(leftDoor, { rotation: -85, duration: 0.7 }, 0)
      .to(rightDoor, { rotation: 85, duration: 0.7 }, 0)
      .to(wrapperRef.current, { scale: 1.15, y: "-3vh", duration: 0.9 }, 0.35)
      .to(fadeOverlay, { opacity: 1, duration: 0.25 }, 1.25);

    // Optional: Animate interior cookies if element exists
    if (interiorCookies) {
      timeline.to(
        interiorCookies,
        {
          opacity: 1,
          scale: 1.02,
          duration: 0.5,
          ease: "power1.out",
        },
        0.15 // Start slightly after doors begin opening
      );
    }
  };

  // Handle immediate navigation (Enter Shop button)
  const handleEnterShop = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      navigate("/shop");
    }, 250);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Full-screen SVG storefront */}
      <div
        ref={wrapperRef}
        className="absolute inset-0"
        style={{
          transformOrigin: "center center",
          willChange: "transform",
        }}
      >
        {/* SVG container with object-fit equivalent for inline SVG */}
        <div
          ref={svgRef}
          className="w-full h-full flex items-center justify-center"
          style={{
            backgroundColor: "#f6efe3",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="1080"
            viewBox="0 0 1920 1080"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f6b24b" />
                <stop offset="1" stopColor="#e99a2c" />
              </linearGradient>

              <pattern
                id="brickPattern"
                width="180"
                height="90"
                patternUnits="userSpaceOnUse"
              >
                <rect width="180" height="90" fill="url(#wallGrad)" />
                <path
                  d="M0 45 H180"
                  stroke="#d9871f"
                  strokeWidth="6"
                  opacity="0.55"
                />
                <path
                  d="M90 0 V45 M0 45 V90 M180 45 V90"
                  stroke="#d9871f"
                  strokeWidth="6"
                  opacity="0.55"
                />
                <path
                  d="M0 0 H180 M0 90 H180"
                  stroke="#f8c77a"
                  strokeWidth="3"
                  opacity="0.35"
                />
              </pattern>

              <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#e9f3ff" stopOpacity="0.85" />
                <stop offset="1" stopColor="#b7d6ff" stopOpacity="0.35" />
              </linearGradient>

              <linearGradient id="doorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#2f6f9a" />
                <stop offset="1" stopColor="#244f70" />
              </linearGradient>

              <linearGradient id="interiorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1a3150" />
                <stop offset="1" stopColor="#0f2138" />
              </linearGradient>

              <filter
                id="softShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="12"
                  floodColor="#000"
                  floodOpacity="0.25"
                />
              </filter>

              <filter
                id="signShadow"
                x="-30%"
                y="-50%"
                width="160%"
                height="220%"
              >
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="10"
                  floodColor="#000"
                  floodOpacity="0.25"
                />
              </filter>
            </defs>

            {/* BACKGROUND / WALL */}
            <g id="BG">
              <rect width="1920" height="1080" fill="#f6efe3" />
              <rect
                x="0"
                y="0"
                width="1920"
                height="860"
                fill="url(#brickPattern)"
              />

              {/* Ground */}
              <rect x="0" y="860" width="1920" height="220" fill="#6ea36d" />
              <rect x="0" y="900" width="1920" height="180" fill="#5a9259" />

              {/* Pink planter strip */}
              <rect
                x="0"
                y="760"
                width="1920"
                height="100"
                fill="#f08aa0"
                opacity="0.95"
              />
              <path
                d="M0 810 C120 770, 260 850, 390 810 C520 770, 650 850, 780 810 C910 770, 1040 850, 1170 810 C1300 770, 1430 850, 1560 810 C1690 770, 1820 850, 1920 810 L1920 860 L0 860 Z"
                fill="#ff9bb0"
                opacity="0.95"
              />

              {/* Sign */}
              <g id="Sign" filter="url(#signShadow)">
                <rect
                  x="560"
                  y="80"
                  rx="32"
                  ry="32"
                  width="800"
                  height="150"
                  fill="#162f4b"
                />
                <text
                  x="960"
                  y="175"
                  textAnchor="middle"
                  fontFamily="Trebuchet MS, Arial, sans-serif"
                  fontSize="84"
                  fontWeight="700"
                  fill="#f6efe3"
                >
                  Flatout Cookies
                </text>
                <text
                  x="960"
                  y="230"
                  textAnchor="middle"
                  fontFamily="Trebuchet MS, Arial, sans-serif"
                  fontSize="30"
                  fontWeight="600"
                  fill="#f6efe3"
                  opacity="0.9"
                >
                  Thin • Crisp • Dangerous
                </text>
              </g>

              {/* Side windows (arched) */}
              <g id="Windows" filter="url(#softShadow)">
                {/* Left window */}
                <path
                  d="M220 260 Q220 160 320 160 Q420 160 420 260 L420 660 Q420 720 320 720 Q220 720 220 660 Z"
                  fill="#0f2740"
                />
                <path
                  d="M250 270 Q250 185 320 185 Q390 185 390 270 L390 645 Q390 690 320 690 Q250 690 250 645 Z"
                  fill="url(#glassGrad)"
                />
                <path
                  d="M285 235 L360 690"
                  stroke="#ffffff"
                  strokeWidth="18"
                  opacity="0.25"
                  strokeLinecap="round"
                />

                {/* Right window */}
                <path
                  d="M1500 260 Q1500 160 1600 160 Q1700 160 1700 260 L1700 660 Q1700 720 1600 720 Q1500 720 1500 660 Z"
                  fill="#0f2740"
                />
                <path
                  d="M1530 270 Q1530 185 1600 185 Q1670 185 1670 270 L1670 645 Q1670 690 1600 690 Q1530 690 1530 645 Z"
                  fill="url(#glassGrad)"
                />
                <path
                  d="M1565 235 L1640 690"
                  stroke="#ffffff"
                  strokeWidth="18"
                  opacity="0.25"
                  strokeLinecap="round"
                />
              </g>
            </g>

            {/* INTERIOR (behind doors) */}
            <g id="Interior" filter="url(#softShadow)">
              <rect
                x="660"
                y="250"
                width="600"
                height="620"
                rx="18"
                fill="#0d1f36"
              />
              <rect
                x="690"
                y="275"
                width="540"
                height="570"
                rx="14"
                fill="url(#interiorGrad)"
              />

              {/* Floor mat inside */}
              <ellipse
                cx="960"
                cy="860"
                rx="220"
                ry="70"
                fill="#000"
                opacity="0.18"
              />
              <ellipse
                cx="960"
                cy="850"
                rx="210"
                ry="60"
                fill="#c8b28c"
                opacity="0.9"
              />
            </g>

            {/* INTERIOR COOKIES (separate group for animation, behind doors) */}
            <g id="InteriorCookies">
              {/* Shelves */}
              <rect
                x="710"
                y="360"
                width="500"
                height="18"
                fill="#294a6a"
                opacity="0.95"
              />
              <rect
                x="710"
                y="500"
                width="500"
                height="18"
                fill="#294a6a"
                opacity="0.95"
              />
              <rect
                x="710"
                y="640"
                width="500"
                height="18"
                fill="#294a6a"
                opacity="0.95"
              />

              {/* Cookie jars (top shelf) */}
              <g id="CookieJarsTop">
                <g transform="translate(980 300)">
                  <rect
                    x="0"
                    y="40"
                    width="70"
                    height="70"
                    rx="10"
                    fill="#cfe4ff"
                    opacity="0.9"
                  />
                  <rect
                    x="10"
                    y="25"
                    width="50"
                    height="20"
                    rx="6"
                    fill="#b1c7e6"
                    opacity="0.9"
                  />
                  <circle cx="35" cy="78" r="16" fill="#d18a4b" />
                  <circle cx="25" cy="86" r="6" fill="#b56c34" />
                  <circle cx="44" cy="92" r="7" fill="#b56c34" />
                </g>
                <g transform="translate(1065 300)">
                  <rect
                    x="0"
                    y="40"
                    width="70"
                    height="70"
                    rx="10"
                    fill="#cfe4ff"
                    opacity="0.9"
                  />
                  <rect
                    x="10"
                    y="25"
                    width="50"
                    height="20"
                    rx="6"
                    fill="#b1c7e6"
                    opacity="0.9"
                  />
                  <circle cx="35" cy="80" r="16" fill="#c78b56" />
                  <circle cx="22" cy="90" r="7" fill="#a55d2c" />
                  <circle cx="45" cy="92" r="6" fill="#a55d2c" />
                </g>
              </g>

              {/* Cookie trays (middle shelf) */}
              <g id="CookieTrays">
                <rect
                  x="735"
                  y="520"
                  width="150"
                  height="55"
                  rx="10"
                  fill="#f6efe3"
                />
                <circle cx="770" cy="548" r="14" fill="#c97a3a" />
                <circle cx="810" cy="548" r="14" fill="#c97a3a" />
                <circle cx="850" cy="548" r="14" fill="#c97a3a" />
                <circle cx="790" cy="562" r="6" fill="#5a2a17" />
                <circle cx="830" cy="562" r="6" fill="#5a2a17" />

                <rect
                  x="915"
                  y="520"
                  width="150"
                  height="55"
                  rx="10"
                  fill="#f6efe3"
                />
                <circle cx="950" cy="548" r="14" fill="#d08a4a" />
                <circle cx="990" cy="548" r="14" fill="#d08a4a" />
                <circle cx="1030" cy="548" r="14" fill="#d08a4a" />
                <circle cx="965" cy="563" r="6" fill="#5a2a17" />
                <circle cx="1015" cy="563" r="6" fill="#5a2a17" />

                <rect
                  x="1095"
                  y="520"
                  width="110"
                  height="55"
                  rx="10"
                  fill="#f6efe3"
                />
                <circle cx="1125" cy="548" r="14" fill="#be6f35" />
                <circle cx="1165" cy="548" r="14" fill="#be6f35" />
                <circle cx="1145" cy="563" r="6" fill="#5a2a17" />
              </g>

              {/* Bottom shelf: cookie boxes */}
              <g id="CookieBoxes">
                <rect
                  x="735"
                  y="665"
                  width="170"
                  height="80"
                  rx="14"
                  fill="#ffcf7a"
                />
                <rect
                  x="755"
                  y="685"
                  width="130"
                  height="12"
                  rx="6"
                  fill="#d57b2f"
                  opacity="0.85"
                />
                <text
                  x="820"
                  y="735"
                  textAnchor="middle"
                  fontFamily="Trebuchet MS, Arial, sans-serif"
                  fontSize="22"
                  fontWeight="800"
                  fill="#7a3b12"
                >
                  COOKIES
                </text>

                <rect
                  x="925"
                  y="665"
                  width="170"
                  height="80"
                  rx="14"
                  fill="#ffd9b0"
                />
                <rect
                  x="945"
                  y="685"
                  width="130"
                  height="12"
                  rx="6"
                  fill="#c86a2b"
                  opacity="0.75"
                />
                <text
                  x="1010"
                  y="735"
                  textAnchor="middle"
                  fontFamily="Trebuchet MS, Arial, sans-serif"
                  fontSize="22"
                  fontWeight="800"
                  fill="#7a3b12"
                >
                  THIN
                </text>

                <rect
                  x="1115"
                  y="665"
                  width="90"
                  height="80"
                  rx="14"
                  fill="#ffe8d1"
                />
                <text
                  x="1160"
                  y="735"
                  textAnchor="middle"
                  fontFamily="Trebuchet MS, Arial, sans-serif"
                  fontSize="20"
                  fontWeight="900"
                  fill="#7a3b12"
                >
                  SNAP
                </text>
              </g>

              {/* Additional visible cookies on shelves */}
              <g id="ExtraCookies">
                {/* Left side top shelf - cookie stack */}
                <g transform="translate(750 310)">
                  <circle cx="35" cy="50" r="18" fill="#d18a4b" />
                  <circle cx="28" cy="55" r="7" fill="#8b4a2f" />
                  <circle cx="42" cy="52" r="6" fill="#8b4a2f" />
                  <circle cx="35" cy="45" r="5" fill="#8b4a2f" />
                </g>

                {/* Right side top shelf - cookie plate */}
                <g transform="translate(1130 305)">
                  <ellipse
                    cx="40"
                    cy="65"
                    rx="45"
                    ry="15"
                    fill="#f6efe3"
                    opacity="0.9"
                  />
                  <circle cx="25" cy="58" r="12" fill="#c97a3a" />
                  <circle cx="45" cy="56" r="13" fill="#be6f35" />
                  <circle cx="55" cy="60" r="11" fill="#d08a4a" />
                  <circle cx="22" cy="62" r="5" fill="#5a2a17" />
                  <circle cx="48" cy="58" r="4" fill="#5a2a17" />
                  <circle cx="58" cy="62" r="5" fill="#5a2a17" />
                </g>

                {/* Middle shelf - loose cookies */}
                <g transform="translate(1080 530)">
                  <circle cx="20" cy="20" r="14" fill="#c97a3a" />
                  <circle cx="15" cy="25" r="6" fill="#5a2a17" />
                  <circle cx="25" cy="22" r="5" fill="#5a2a17" />
                </g>
              </g>
            </g>

            {/* DOOR FRAME - only outer border, interior visible */}
            <g id="DoorFrame" filter="url(#softShadow)">
              {/* Top border */}
              <rect
                x="640"
                y="230"
                width="640"
                height="30"
                rx="22"
                fill="#0f2740"
              />

              {/* Left border */}
              <rect x="640" y="230" width="35" height="660" fill="#0f2740" />

              {/* Right border */}
              <rect x="1245" y="230" width="35" height="660" fill="#0f2740" />

              {/* Bottom border */}
              <rect
                x="640"
                y="860"
                width="640"
                height="30"
                rx="22"
                fill="#0f2740"
              />
            </g>

            {/* LEFT DOOR (separate group for animation) */}
            <g id="LeftDoor" filter="url(#softShadow)">
              <path d="M680 270 H955 V880 H680 Z" fill="url(#doorGrad)" />
              <path
                d="M705 690 H930 V845 H705 Z"
                fill="#1f4b69"
                opacity="0.55"
              />
              <path
                d="M705 515 H930 V665 H705 Z"
                fill="#1f4b69"
                opacity="0.45"
              />

              <path d="M715 305 H920 V560 H715 Z" fill="url(#glassGrad)" />
              <path
                d="M740 320 L875 555"
                stroke="#fff"
                strokeWidth="14"
                opacity="0.22"
                strokeLinecap="round"
              />

              <rect
                x="895"
                y="585"
                width="18"
                height="110"
                rx="9"
                fill="#0b1a2b"
                opacity="0.9"
              />
              <rect
                x="883"
                y="625"
                width="44"
                height="18"
                rx="9"
                fill="#0b1a2b"
                opacity="0.9"
              />

              <g id="OpenSign" transform="translate(705 640)">
                <path
                  d="M10 0 Q60 -40 110 0"
                  fill="none"
                  stroke="#0b1a2b"
                  strokeWidth="6"
                  opacity="0.65"
                />
                <rect
                  x="0"
                  y="0"
                  width="160"
                  height="90"
                  rx="14"
                  fill="#d35b2b"
                  stroke="#f6efe3"
                  strokeWidth="6"
                />
                <text
                  x="80"
                  y="60"
                  textAnchor="middle"
                  fontFamily="Trebuchet MS, Arial, sans-serif"
                  fontSize="40"
                  fontWeight="900"
                  fill="#f6efe3"
                >
                  OPEN
                </text>
              </g>
            </g>

            {/* RIGHT DOOR (separate group for animation) */}
            <g id="RightDoor" filter="url(#softShadow)">
              <path d="M965 270 H1240 V880 H965 Z" fill="url(#doorGrad)" />
              <path
                d="M990 690 H1215 V845 H990 Z"
                fill="#1f4b69"
                opacity="0.55"
              />
              <path
                d="M990 515 H1215 V665 H990 Z"
                fill="#1f4b69"
                opacity="0.45"
              />

              <path d="M1000 305 H1205 V560 H1000 Z" fill="url(#glassGrad)" />
              <path
                d="M1025 320 L1160 555"
                stroke="#fff"
                strokeWidth="14"
                opacity="0.22"
                strokeLinecap="round"
              />

              <rect
                x="1000"
                y="585"
                width="18"
                height="110"
                rx="9"
                fill="#0b1a2b"
                opacity="0.9"
              />
              <rect
                x="986"
                y="625"
                width="44"
                height="18"
                rx="9"
                fill="#0b1a2b"
                opacity="0.9"
              />
            </g>

            {/* Foreground shadow on ground */}
            <ellipse
              cx="960"
              cy="915"
              rx="430"
              ry="90"
              fill="#000"
              opacity="0.18"
            />
          </svg>
        </div>

        {/* Invisible clickable hotspot over the doorway */}
        {!isAnimating && (
          <button
            onClick={handleDoorClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleDoorClick();
              }
            }}
            aria-label="Enter shop"
            className="absolute border-0 bg-transparent outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-75 transition-all cursor-pointer"
            style={{
              left: DOOR_HOTSPOT.left,
              top: DOOR_HOTSPOT.top,
              width: DOOR_HOTSPOT.width,
              height: DOOR_HOTSPOT.height,
            }}
            tabIndex={0}
          />
        )}
      </div>

      {/* Fade overlay for transition */}
      <div
        id="fadeOverlay"
        className="absolute inset-0 bg-white"
        style={{
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default LandingPage;
