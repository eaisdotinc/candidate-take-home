import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import styles from '../app/page.module.css';

interface Props {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
}

const InputBar = ({ input, setInput, onSend }: Props) => {
  return (
    <div className={styles.inputBar}>
      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
      />
      <button onClick={onSend} className={styles.sendButton} aria-label="Send">
        <PaperAirplaneIcon className={styles.sendIcon} />
      </button>
    </div>
  );
};

export default InputBar;
