'use client';

import { Loader } from 'lucide-react';
import dynamic from 'next/dynamic';
import type Quill from 'quill';
import { useRef, useState } from 'react';
import { toast } from 'sonner';


const Editor = dynamic(() => import('@/components/editor'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Loader className="size-6 animate-spin text-muted-foreground" />
    </div>
  ),
});

interface ChatInputProps {
  placeholder?: string;
  onSubmit: ({body, image}:{body:string,image:File | null})=> void
}

type CreateMessageValues = {
  body: string;
  image?: File | null;
};

export const ChatInput = ({ placeholder }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const innerRef = useRef<Quill | null>(null);




  const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
    try {
      setIsPending(true);
      innerRef.current?.enable(false);

      const values: CreateMessageValues = {

        body,
        image: undefined,
      };

      
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setIsPending(false);
      innerRef?.current?.enable(true);
    }
  };

  return (
    <div className="w-full">
      <Editor placeholder={placeholder} key={editorKey} onSubmit={handleSubmit} disabled={isPending} innerRef={innerRef} />
    </div>
  );
};