import Select from "react-select";
import React from "react";
import ReactSearchBox from "react-search-box";
import "../styles/FilterSection.css";
// import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
import { FaSearch } from "react-icons/fa";

const options = [
  {
    value: "option 1",
    label: "option 1",
  },
  {
    value: "option 2",
    label: "option 2",
  },
];

export default function FilterSection() {
  return (
    <>
      {/*Filter container box*/}
      <div className={"filterSection"}>
        {/*Searchbar area*/}
        <div className="search-bar-div">
          {/*<FaSearch></FaSearch>*/}
          <ReactSearchBox
            id={"search-box"}
            leftIcon={<FaSearch color={"black"}></FaSearch>}
            placeholder="search..."
            style={{ border: "2px solid black", width: "100px" }}
          ></ReactSearchBox>
        </div>

        {/*Filter area 1*/}
        <div className="sort-wrapper" style={{ paddingTop: "1em" }}>
          <label htmlFor="sortSelect">Sort by:</label>
          <Select
            name="sortSelect"
            className="sort-select-input"
            options={options}
            isMulti
            isSearchable
            noOptionsMessage={() => "No options found!"}
          />
        </div>

        {/*Filter area 1*/}
        <div className="select-wrapper">
          <label htmlFor="ageSelect">Age</label>
          <Select
            name="ageSelect"
            className="select-input"
            options={options}
            isMulti
            isSearchable
            noOptionsMessage={() => "No options found!"}
          />
        </div>

        {/*Filter area 2*/}
        <div className="select-wrapper">
          <label htmlFor="targetGroupSelect">Educational Target group</label>
          <Select
            name="targetGroupSelect"
            className="select-input"
            options={options}
            isMulti
            isSearchable
            noOptionsMessage={() => "No options found!"}
          />
        </div>
        <div className="select-wrapper">
          <label htmlFor="researchThemeSelect">Research theme</label>
          <Select
            className="select-input"
            options={options}
            isMulti
            isSearchable
            noOptionsMessage={() => "No options found!"}
          />
        </div>
      </div>
    </>
  );
}
