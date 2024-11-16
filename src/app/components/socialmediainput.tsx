import React from 'react';

interface SocialMediaInputProps {
  platform: string;
  url: string;
  onUrlChange: (url: string) => void;
}

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E1306C" className="mr-2" viewBox="0 0 16 16">
          <path d="M8 3c1.555 0 1.743.006 2.356.034.612.029 1.02.13 1.387.276a2.6 2.6 0 0 1 .937.627 2.6 2.6 0 0 1 .627.937c.146.367.247.775.276
                    1.387.028.613.034.801.034 2.356s-.006 1.743-.034 2.356c-.029.612-.13 1.02-.276 1.387a2.6 2.6 0 0 1-.627.937 2.6 2.6 0 0 1-.937
                    .627c-.367.146-.775.247-1.387.276-.613.028-.801.034-2.356.034s-1.743-.006-2.356-.034c-.612-.029-1.02-.13-1.387-.276a2.6 2.6 0 0
                    1-.937-.627 2.6 2.6 0 0 1-.627-.937c-.146-.367-.247-.775-.276-1.387C3.006 9.743 3 9.555 3 8s.006-1.743.034-2.356c.029-.612.13
                    -1.02.276-1.387a2.6 2.6 0 0 1 .627-.937 2.6 2.6 0 0 1 .937-.627c.367-.146.775-.247 1.387-.276C6.257 3.006 6.445 3 8 3zm0-1C6.423
                    2 6.22 2.006 5.605 2.034 5.006 2.062 4.615 2.152 4.3 2.29a3.6 3.6 0 0 0-1.304.872A3.6 3.6 0 0 0 2.29 4.3c-.138.314-.228.706-.256
                    1.305C2.006 6.22 2 6.423 2 8c0 1.577.006 1.78.034 2.395.028.599.118.991.256 1.305a3.6 3.6 0 0 0 .872 1.304 3.6 3.6 0 0 0 
                    1.304.872c.314.138.706.228 1.305.256C6.22 13.994 6.423 14 8 14c1.577 0 1.78-.006 2.395-.034.599-.028.991-.118 1.305-.256a3.6 
                    3.6 0 0 0 1.304-.872 3.6 3.6 0 0 0 .872-1.304c.138-.314.228-.706.256-1.305.028-.615.034-.818.034-2.395 0-1.577-.006-1.78-.034-
                    2.395-.028-.599-.118-.991-.256-1.305a3.6 3.6 0 0 0-.872-1.304 3.6 3.6 0 0 0-1.304-.872c-.314-.138-.706-.228-1.305-.256C9.78 2.006
                    9.577 2 8 2z" />
          <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 1.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6z" />
          <circle cx="12.5" cy="3.5" r="1.5" />
        </svg>
      );
    case 'facebook':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1877F2" className="mr-2" viewBox="0 0 16 16">
          <path d="M8 1C3.58 1 0 4.58 0 8.992 0 13.124 2.88 16.56 6.481 16.997V10.68H4.713V8.992h1.768V7.34c0-1.6.83-2.514 2.117-2.514.61 0 1.254.104 
                    1.254.104v1.455H8.918c-.87 0-1.14.54-1.14 1.096v1.277H10.1l-.244 1.688H7.778v6.318C11.12 16.56 14 13.124 14 8.992 14 4.58 10.42 1 
                    8 1z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#1DA1F2" className="mr-2" viewBox="0 0 16 16">
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.675 6.675 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301
                    0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.084.793A3.301 3.301 0 0 0 7.875 7.034a9.325 9.325 0 0 1-6.766-3.431 3.274 3.274 0 0 0 1.02 
                    4.396A3.32 3.32 0 0 1 .64 7.028v.041A3.301 3.301 0 0 0 3.28 10.24a3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.619-.059 3.301 3.301 
                    0 0 0 3.067 2.278A6.588 6.588 0 0 1 0 13.026a9.29 9.29 0 0 0 5.031 1.474" />
        </svg>
      );
    default:
      return null;
  }
};

const SocialMediaInput: React.FC<SocialMediaInputProps> = ({ platform, url, onUrlChange }) => {
  return (
    <div className="social-link-item flex items-center bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="icon-wrapper mr-2">
        {getPlatformIcon(platform)}
      </div>
      <div className="flex-1">
        <input
          placeholder={`Enter ${platform} URL`}
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          className="social-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
        />
      </div>
    </div>
  );
};

export default SocialMediaInput;
