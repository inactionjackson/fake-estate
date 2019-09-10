import { action } from "easy-peasy";
const model = {
  searchFilters: {
    minPrice: 0,
    maxPrice: 999999999,
    minBdr: 0,
    minBath: 0,
    minSqft: 0,
    bHasGarage: false
  },
  setMinPrice: action((state, minPrice) => {
    state.searchFilters.minPrice = minPrice;
  }),
  setMaxPrice: action((state, maxPrice) => {
    state.searchFilters.maxPrice = maxPrice;
  }),
  setMinBdr: action((state, minBdr) => {
    state.searchFilters.minBdr = minBdr;
  }),
  setMinBath: action((state, minBath) => {
    state.searchFilters.minBath = minBath;
  }),
  setMinSqft: action((state, minSqft) => {
    state.searchFilters.minSqft = minSqft;
  }),
  togglebHasGarage: action((state, e) => {
    state.searchFilters.bHasGarage = e.target.checked;
  }),
  selectedCity: { city: "", state: "" },
  setSelectedCity: action((state, obj) => {
    state.selectedCity = obj;
  }),
  fullResults: [],
  setFullResults: action((state, res) => {
    state.fullResults = res;
  }),
  filteredResults: [],
  setFilteredResults: action((state, results) => {
    state.filteredResults = results;
  }),
  activeDropdown: null,
  setActiveDropdown: action((state, id) => {
    state.activeDropdown = id;
  }),
  selectedHouseId: null,
  setSelectedHouseId: action((state, id) => {
    state.selectedHouseId = id;
  })
};

export default model;
