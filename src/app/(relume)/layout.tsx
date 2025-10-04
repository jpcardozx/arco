import { ReactNode } from 'react';

export default function RelumeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relume-pages">
      {children}
    </div>
  );
}
