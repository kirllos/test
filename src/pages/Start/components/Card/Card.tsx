import styles from "./Card.module.scss";
interface ICardProps {
  text: string;
  handleClick: () => void;
}
const Card = ({ text, handleClick }: ICardProps) => {
  return (
    <div
      onClick={handleClick}
      className={styles.card}
    >
      {text}
    </div>
  );
};

export default Card;
