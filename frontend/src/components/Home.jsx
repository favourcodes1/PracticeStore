import FilterSection from "./FilterSection";
import CardsSection from "./CardsSection";
import "../styles/TopContainer.css";
import "../styles/Home.css";

export default function Home() {
  return (
    // contains page content
    <div className={"super-container"}>
      {/*contains header*/}

      {/*contains main page content*/}
      <div className="outer-div">
        <div className="filter-outer-div">
          <FilterSection />
        </div>
        <div className="cardsSection-outer-div">
          <CardsSection />
        </div>
      </div>
    </div>
  );
}
