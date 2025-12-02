import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';

const ChatContainer = () => {
  const {selectedUser, getMessagesByUserId, messages} = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId])
  return (
    <>
      <ChatHeader />
      <div className='flex-1 px-6 overflow-y-auto py-8'>
        {messages.length > 0 ? (
          <p>Some messages</p>
        ) : (
          <NoChatHistoryPlaceholder />
        )}
      </div>
    </>
  )
}

export default ChatContainer