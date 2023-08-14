import { PacmanLoader } from "react-spinners";
import styles from "./Loader.module.css";

export const Loader = ({ isLoading }: { isLoading: boolean }) => (
  <>
    {isLoading && (
      <div className={styles.loader}>
        <PacmanLoader color="#161616" />
      </div>
    )}
  </>
);
