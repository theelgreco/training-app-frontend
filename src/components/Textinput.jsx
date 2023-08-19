import styles from "@/styles/Textinput.module.css";
import clsx from "clsx";

export default function Textinput({ type, labelText, setMethod, value }) {
  const handleChange = (e) => {
    setMethod(e.target.value);
  };

  return (
    <div
      className={clsx(styles["textinput-container"], {
        [styles["textinput-container--state-notext"]]: !value,
        [styles["textinput-container--state-text"]]: value,
      })}>
      <input type={type} onChange={handleChange} value={value} />
      <label>{labelText}</label>
    </div>
  );
}
