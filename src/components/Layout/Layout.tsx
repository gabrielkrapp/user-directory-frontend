import { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <div className="layout-container">{children}</div>
    </div>
  );
}

