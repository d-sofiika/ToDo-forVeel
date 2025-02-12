import css from "./Loader.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loader({active}) {

  return (
    <div className={css.loadingContainer}>
        <PropagateLoader
          color="white"
          loading={active}
          size={30}
          aria-label="Loading..."
          data-testid="loader"
        />

    </div>
  );
}
