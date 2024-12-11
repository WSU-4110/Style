'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './homepage_card.css';

interface CardProps {
  businessName: string;
  address: string;
  images: string[];
  about: string;
  services: string[];
  route?: string; 
  onBookClick: (businessName: string) => void;
}

const Homepage_Card: React.FC<CardProps> = ({
  businessName,
  address,
  images,
  about,
  services,
  route,
  onBookClick,
}) => {
  const router = useRouter();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [showReportSubmitted, setShowReportSubmitted] = useState(false); // State for the "Report Submitted" popup

  const handleCardClick = () => {
    if (!showReportModal && route) {
      router.push(route);
    }
  };

  const handleBookClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onBookClick(businessName);
  };

  const handleReportClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    <>
      <div className={`card ${showReportModal ? 'no-click' : ''}`} onClick={handleCardClick}>
        <div className="imagePlaceholder">
          {images.length > 0 && (
            <img 
              src={images[0]} 
              alt={`${businessName} preview`} 
              className="card-image" 
            />
          )}
        </div>

        <div className="info">
          <h2 className="businessName">{businessName}</h2>
          <p className="address">{address}</p>
          <p className="about">{about}</p>
          <h3>Services</h3>
          <div className="services">
            <ul>
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </div>

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
          <button
            className="icon-button report"
            onClick={handleReportClick}
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/012/042/292/small/warning-sign-icon-transparent-background-free-png.png"
              alt="Report"
            />
          </button>
        </div>

        <button 
          className="button book-button" 
          onClick={handleBookClick}
        >
          Book
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
              <button onClick={handleReportSubmit} className="button submit-button">
                Submit
              </button>
              <button onClick={handleModalClose} className="button cancel-button">
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
    </>
  );
};

export default Homepage_Card;
