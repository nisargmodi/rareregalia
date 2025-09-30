/**
 * Custom navigation hook that works around Next.js router issues
 * Uses window.location.href as fallback since Next.js router is not functioning
 */

import { useRouter } from 'next/navigation';

export function useWorkingNavigation() {
  const router = useRouter();
  
  const navigate = (href: string) => {
    // Try Next.js router first
    try {
      router.push(href);
      
      // Fallback to window.location if router doesn't work
      setTimeout(() => {
        if (window.location.pathname !== href && !href.includes('?')) {
          console.warn('Next.js router failed, using window.location fallback');
          window.location.href = href;
        }
      }, 100);
    } catch (error) {
      console.error('Router error, using window.location fallback:', error);
      window.location.href = href;
    }
  };
  
  return { navigate };
}

/**
 * Working Link component that uses window.location as fallback
 */
import Link from 'next/link';
import { ReactNode, MouseEvent } from 'react';

interface WorkingLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function WorkingLink({ href, children, className, onClick }: WorkingLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick first if provided
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }
    
    // Prevent default and use window.location for reliable navigation
    e.preventDefault();
    window.location.href = href;
  };
  
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}