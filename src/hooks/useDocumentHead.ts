import { useEffect } from 'react';

interface DocumentHeadOptions {
  title: string;
  description?: string;
}

export function useDocumentHead({ title, description }: DocumentHeadOptions) {
  useEffect(() => {
    const baseTitle = 'Luis Carlos Vieira';
    document.title = `${title} | ${baseTitle}`;

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);
}
