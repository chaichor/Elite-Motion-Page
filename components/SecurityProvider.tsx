'use client';

import { useEffect } from 'react';

function lockNode(node: Element) {
  if (node instanceof HTMLImageElement) {
    node.draggable = false;
    node.setAttribute('draggable', 'false');
  }

  if (node instanceof HTMLVideoElement) {
    node.setAttribute('controlsList', 'nodownload noplaybackrate noremoteplayback');
    node.disablePictureInPicture = true;
    node.disableRemotePlayback = true;
  }
}

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleDragStart = (e: DragEvent) => {
      const target = e.target;
      if (target instanceof HTMLImageElement || target instanceof HTMLVideoElement) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') e.preventDefault();
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
      }
    };

    document.querySelectorAll('img, video').forEach(lockNode);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('img, video')) lockNode(node);
          node.querySelectorAll('img, video').forEach(lockNode);
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      observer.disconnect();
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
