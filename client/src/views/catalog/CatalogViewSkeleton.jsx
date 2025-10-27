import React from 'react';
import './CatalogSkeletonCss.css';

const BookCardSkeleton = () => (
  <div className="skeleton-book-card">
    <div className="skeleton-box skeleton-image"></div>
    <div className="skeleton-box skeleton-title"></div>
    <div className="skeleton-box skeleton-author"></div>
    <div className="skeleton-box skeleton-rating"></div>
  </div>
);

const SidebarSkeleton = () => (
  <div className="skeleton-left-section">
    <div className="skeleton-box skeleton-title"></div>
    <div className="skeleton-box skeleton-search-input"></div>

    <div className="skeleton-box skeleton-title"></div>
    <div className="skeleton-box skeleton-search-input" style={{ height: '35px' }}></div>

    <div style={{ marginTop: '20px' }}>
      <div className="skeleton-box skeleton-title"></div>
      <div className="skeleton-box skeleton-text-line"></div>
      <div className="skeleton-box skeleton-text-line"></div>
      <div className="skeleton-box skeleton-short-line"></div>
    </div>

    <div style={{ marginTop: '30px' }}>
      <div className="skeleton-box skeleton-title"></div>
      <div className="skeleton-box skeleton-text-line"></div>
      <div className="skeleton-box skeleton-text-line"></div>
      <div className="skeleton-box skeleton-short-line"></div>
    </div>

    <div className="skeleton-box skeleton-button"></div>
  </div>
);

const CatalogViewSkeleton = () => {
  const numSkeletons = Array(12).fill(0); 

  return (
    <main className="book-catalog-skeleton">
      
      <SidebarSkeleton />
      
      <div className="skeleton-book-catalog-grid">
        {numSkeletons.map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};

export default CatalogViewSkeleton;