export const Step5AddController = ({
  nextStep = () => {},
  prevStep = () => {},
}) => (
  <div>
    <p>Это шаг 5</p>
    <button onClick={prevStep}>Назад</button>
    <button onClick={nextStep}>Вперед</button>
  </div>
);
