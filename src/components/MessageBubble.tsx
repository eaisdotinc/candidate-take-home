import styles from '../app/page.module.css';

import { Sender } from '../types/message';

interface Props {
  sender: Sender;
  text: string;
}

const MessageBubble = ({ sender, text }: Props) => (
  <div className={`${styles.messageRow} ${sender === 'user' ? styles.user : styles.bot}`}>
    <div className={styles.messageBubble}>{text}</div>
  </div>
);

export default MessageBubble;
