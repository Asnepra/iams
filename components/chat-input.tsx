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
  onSubmit: ({ body, image }: { body: string; image: File | null }) => void; // Added onSubmit prop
}

type CreateMessageValues = {
  // channelId: Id<'channels'>;
  // workspaceId: Id<'workspaces'>;
  body: string;
  image?: File | null
};

export const ChatInput = ({ placeholder, onSubmit }: ChatInputProps) => {
  const [editorKey, setEditorKey] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const innerRef = useRef<Quill | null>(null);

  // const workspaceId = useWorkspaceId();
  // const channelId = useChannelId();

  // const { mutate: createMessage } = useCreateMessage();
  // const { mutate: generateUploadUrl } = useGenerateUploadUrl();

  const handleSubmit = async ({ body, image }: { body: string; image: File | null }) => {
    try {
      setIsPending(true);
      innerRef.current?.enable(false);

      const values: CreateMessageValues = {
        // channelId,
        // workspaceId,
        body,
        image: undefined,
      };

      if (image) {
        image=image
      }//console.log("values formc hat iunut", values);
      onSubmit({body, image});
      //   const url = await generateUploadUrl(
      //     {},
      //     {
      //       throwError: true,
      //     },
      //   );

      //   if (!url) throw new Error('URL not found.');

      //   const result = await fetch(url, {
      //     method: 'POST',
      //     headers: { 'Content-type': image.type },
      //     body: image,
      //   });

      //   if (!result.ok) throw new Error('Failed to upload image.');

      //   const { storageId } = await result.json();

      //   values.image = storageId;
      // }

      // await createMessage(values, { throwError: true });

      setEditorKey((prevKey) => prevKey + 1);
    } catch (error) {
      toast.error('Failed to send message.');
    } finally {
      setIsPending(false);
      innerRef?.current?.enable(true);
    }
  };

  return (
    <div className="w-full ">
      <Editor placeholder={placeholder} key={editorKey} onSubmit={handleSubmit} disabled={isPending} innerRef={innerRef} />
    </div>
  );
};