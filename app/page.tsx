'use client';

import NotLoggedInAlert from '@/components/NotLoggedInAlert';
import Chat from '@/components/chat/chat';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex-1 overflow-y-hidden">
      <Chat />
      <NotLoggedInAlert />
    </div>
  );
}
