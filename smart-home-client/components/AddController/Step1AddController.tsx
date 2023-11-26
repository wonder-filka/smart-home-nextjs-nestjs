import styles from "./AddControllerSteps.module.scss";
import { Button } from "@/components/Button/Button";

export const Step1AddController = ({ nextStep = () => {} }) => (
  <div className={styles.AddController1}>
    <h1>Выберите метод</h1>
    {/* <button onClick={nextStep}>Вперед</button> */}
    <Button appearance="primary" onClick={nextStep}>
      Добавить с wifi
    </Button>
    <br />
    <Button appearance="secondary" onClick={nextStep}>
      Добавить вручную
    </Button>
    <br />
    <p>
      Если вы выбираете “ДОБАВИТЬ С WIFI”, пожалуйста, убедитесь, что вы
      получили разрешение на управление WIFI
    </p>
  </div>
);
