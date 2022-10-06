import FilterSelection from "./FilterSelection";
import FilterOption from "./FilterOption";

function Filter(props) {
  return (
    <div style={{margin: '10px 0', textAlign: 'center'}}>
      <FilterSelection
        filterListOptions={props.headers}
        handleChoice={props.handleChoice}
        selectedOption={props.columnChoice}
      />
      <span style={{margin: '0 10px'}}>
      <FilterSelection
        filterListOptions={props.filterListOptions}
        handleChoice={props.handleChoice}
        selectedOption={props.signChoice}
      />
      </span>
      <FilterOption
        handleChange={props.handleChange}
        filteringOption={props.filteringOption}
      />
    </div>
  );
}

export default Filter;
