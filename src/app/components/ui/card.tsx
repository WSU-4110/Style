// card
'use client';
import '../../categories.css';
import React, { useState } from 'react';

interface CardProps {
  businessName: string;
  address: string;
  images: string[];
  about: string;
  services: string[];
  socialLinks?: string[];
  onBookClick: (businessName: string) => void;
  onFavoriteClick?: (businessName: string) => void;
  onReportClick?: (businessName: string) => void;
}

const Card: React.FC<CardProps> = ({
  businessName,
  address,
  images,
  about,
  services,
  socialLinks,
  onBookClick,
  onFavoriteClick,
  onReportClick,
}) => {
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [showReportSubmitted, setShowReportSubmitted] = useState(false); // For the "Report Submitted" popup

  const handleBookClick = () => {
    onBookClick(businessName);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteClick) {
      onFavoriteClick(businessName); 
    }
  };

  const handleReportClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowReportModal(true);
  };

  const handleReportSubmit = () => {
    console.log('Report submitted:', { businessName, reason: reportReason });
    setShowReportModal(false);
    setReportReason('');
    setShowReportSubmitted(true);
    setTimeout(() => {
      setShowReportSubmitted(false);
    }, 3000);
  };

  const handleModalClose = () => {
    setShowReportModal(false);
    setReportReason('');
  };

  return (
    <div className="card">
      <div className="info">
        <div className="imagePlaceholder">
          {images.length > 0 && (
            <img src={images[0]} alt={businessName} className="image" />
          )}
        </div>
        <div>
          <h2 className="businessName">{businessName}</h2>
          <p className="address">{address}</p>
          <p className="about">{about}</p>
          <h3>Services:</h3>
          <ul>
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          {socialLinks && socialLinks.length > 0 && (
            <div>
              <h3>Social Media Links:</h3>
              <ul>
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button className="button book-button" onClick={handleBookClick}>
        Book
      </button>

      <div className="bottom-buttons">
        <button
          className="icon-button favorite"
          onClick={(e) => e.stopPropagation()} 
        >
          <img
            src="https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"
            alt="Favorite"
          />
        </button>
        <button className="icon-button report" onClick={handleReportClick}>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/012/042/292/small/warning-sign-icon-transparent-background-free-png.png"
            alt="Report"
          />
        </button>
      </div>
      {showReportModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Report Business</h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Enter your reason for reporting..."
              rows={4}
            />
            <div className="modal-actions">
              <button
                onClick={handleReportSubmit}
                className="submit-button"
              >
                Submit
              </button>
              <button
                onClick={handleModalClose}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showReportSubmitted && (
        <div className="popup">
          <div className="popup-content">
            <h4>Report Submitted</h4>
            <p>Your report has been submitted.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
