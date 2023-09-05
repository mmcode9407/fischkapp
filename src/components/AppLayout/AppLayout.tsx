import styles from "./AppLayout.module.css";

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.layout}>{children}</div>
);
