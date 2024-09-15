import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';

interface ScrollableContainerProps {
  children: ReactNode;
  className?: string;
}

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({ children, className = '' }) => {
  const { scrollRef } = useSnapCarousel();
  const [scrollbarWidth, setScrollbarWidth] = useState(100);
  const [scrollbarLeft, setScrollbarLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  useEffect(() => {
    const updateScrollbar = () => {
      if (containerRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
        const scrollableWidth = scrollWidth - clientWidth;
        const newWidth = Math.max((clientWidth / scrollWidth) * 100 * 0.65, 10);
        const newLeft = (scrollLeft / scrollableWidth) * (100 - newWidth);
        setScrollbarWidth(newWidth);
        setScrollbarLeft(newLeft);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollbar);
      window.addEventListener('resize', updateScrollbar);
      updateScrollbar();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', updateScrollbar);
        window.removeEventListener('resize', updateScrollbar);
      }
    };
  }, [children]);

  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    if (thumbRef.current && containerRef.current) {
      const thumbRect = thumbRef.current.getBoundingClientRect();
      startXRef.current = e.clientX - thumbRect.left;
      startScrollLeftRef.current = containerRef.current.scrollLeft;
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !containerRef.current || !scrollbarRef.current) return;

    const scrollbarRect = scrollbarRef.current.getBoundingClientRect();
    const scrollableWidth = containerRef.current.scrollWidth - containerRef.current.clientWidth;

    const thumbPosition = e.clientX - scrollbarRect.left - startXRef.current;
    const maxThumbPosition = scrollbarRect.width - (scrollbarRect.width * scrollbarWidth / 100);
    const boundedThumbPosition = Math.max(0, Math.min(thumbPosition, maxThumbPosition));

    const scrollPercentage = boundedThumbPosition / maxThumbPosition;
    const newScrollLeft = scrollPercentage * scrollableWidth;

    containerRef.current.scrollLeft = newScrollLeft;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className={`scrollable-container ${className}`} style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
      <div style={{ overflow: 'hidden' }}>
        <div
          ref={(el) => {
            scrollRef(el);
            containerRef.current = el;
          }}
          style={{
            overflowX: 'auto',
            overflowY: 'visible',
            display: 'flex',
            gap: '30px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '55px',
          }}
        >
          {children}
        </div>
      </div>
      <div
        ref={scrollbarRef}
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '25px',
          backgroundColor: 'transparent',
          cursor: 'grab',
        }}
        onMouseDown={handleScrollbarMouseDown}
      >
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '0',
              right: '0',
              height: '5px',
              backgroundColor: '#D9D9D925',
            }}
          />
          <div
            ref={thumbRef}
            style={{
              position: 'absolute',
              height: '5px',
              backgroundColor: 'var(--token-45FwsPfx-mXu)',
              width: `${scrollbarWidth}%`,
              left: `${scrollbarLeft}%`,
              top: '10px',
              cursor: 'grab',
            }}
          />
        </div>
      </div>
      <style jsx>{`
        .scrollable-container > div > div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollableContainer;