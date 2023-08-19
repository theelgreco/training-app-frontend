import styles from "./page.module.css";
import LinkButton from "@/components/LinkButton";

export default function Page({ params }) {
  const { username } = params;
  return (
    <main className={styles.main}>
      <LinkButton
        url={`/user/${username}/create/workout`}
        text={"Create workout"}
      />
      <LinkButton
        url={`/user/${username}/create/routine`}
        text={"Create routine"}
      />
    </main>
  );
}
