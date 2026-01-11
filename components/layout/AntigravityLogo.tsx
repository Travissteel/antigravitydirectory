'use client';

export function AntigravityLogo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <linearGradient id="logo-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3186FF" /> {/* Blue */}
                    <stop offset="100%" stopColor="#00B95C" /> {/* Green */}
                </linearGradient>
                <linearGradient id="logo-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FC413D" /> {/* Red */}
                    <stop offset="100%" stopColor="#FBBC04" /> {/* Yellow */}
                </linearGradient>
            </defs>
            {/* Stylized 'A' - Mountain Peak / Chevron shape */}
            <path
                d="M50 15L15 85H35L50 50L65 85H85L50 15Z"
                fill="url(#logo-gradient-1)"
                fillOpacity="0.8"
            />
            <path
                d="M50 15L65 85H85L50 15Z"
                fill="url(#logo-gradient-2)"
                fillOpacity="0.9"
            />
            {/* Inner accent for 3D effect */}
            <path
                d="M50 15L40 60H60L50 15Z"
                fill="white"
                fillOpacity="0.1"
            />
        </svg>
    );
}
