import { useRef, useState } from 'react';
import useKeyboardSound from '../hooks/useKeyboardSound';
import { useChatStore } from '../store/useChatStore';

function MessageInput() {
    const { playRandomKeyStrokeSound } = useKeyboardSound();
    const [ text, setText ] = useState("");
    const [ imagePreview, setImagePreview ] = useState(null);

    const fileInputRef = useRef(null);
    const { sendMessage, isSoundEnabled } = useChatStore();
    return <div>MessageInput</div>
}