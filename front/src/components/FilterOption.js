function FilterOption(props){
    // rendering filtering input field
    return (
        <input onChange={props.handleChange} type="text" value={props.filteringOption} >
        </input>
    )
};

export default FilterOption;