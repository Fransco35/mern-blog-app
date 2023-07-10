import { useContext } from "react";
import styles from "./success.module.css";
import AuthContext from "../../context/auth-context";
import Card from "../../components/UI/Card";

const Success = () => {
  const context = useContext(AuthContext);

  return (
    <Card>
      <div className={styles.success}>
        <h1 className={styles.h1}>You're successfully logged in</h1>

        <div>
          <button className={styles.button} onClick={context.navigateHome}>
            Return to Homepage
          </button>
          <button className={styles.button} onClick={context.navigateWrite}>
            Write an article
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Success;
