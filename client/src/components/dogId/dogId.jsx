import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Loading from "../Loading/loading";
import style from "./style.module.css";

export default function DogId() {
  const history = useHistory();
  let result = useSelector((state) => state.dogsId);
  const { name, image, temperament, weight, height, life_span, id } = result;

  function handleNavigation() {
    history.goBack();
  }

  return (
    <div className={style.back}>
      {result ? (
        <div className={style.card}>
          <button className={style.btn} onClick={() => handleNavigation()}>
            Back
          </button>

          <img className={style.img} src={image} alt="" />

          <div>
            <div className={style.title}>
              <h1>{name}</h1>
              <div className={style.details}>
                <span>
                  <strong>weight:</strong> {weight} kg
                </span>

                <span>
                  <strong>Height:</strong> {height} cm
                </span>

                {typeof id === "number" ? (
                  <>
                    <span>
                      <strong>Life span:</strong> {life_span}
                    </span>
                    <span>
                      <strong>Temperaments:</strong>
                      <div></div>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <strong>Life span: </strong> {life_span} years
                    </span>
                    <span>
                      <strong>Temperaments:</strong>
                      <div></div>
                    </span>
                  </>
                )}
              </div>
              {typeof id === "number" ? (
                <div className={style.temp}>
                  {" "}
                  <p>{temperament}</p>
                </div>
              ) : (
                <div className={style.temp}>
                  <p>{temperament.split(" ").join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
