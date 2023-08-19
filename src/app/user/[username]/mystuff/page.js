import styles from "./page.module.css";
import LinkButton from "@/components/LinkButton";

export default function Page({ params }) {
  const { username } = params;
  return (
    <main className={styles.main}>
      <LinkButton
        url={`/user/${username}/mystuff/workout`}
        text={"View workout"}
      />
      <LinkButton
        url={`/user/${username}/mystuff/routine`}
        text={"View routines"}
      />
    </main>
  );
}
