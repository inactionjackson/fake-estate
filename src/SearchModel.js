import { action } from "easy-peasy";
const model = {
  searchFilters: {
    minPrice: 0,
    maxPrice: 999999999,
    minBdr: 0,
    minBth: 0,
    minSqft: 0,
    bHasGarage: false
  },
  setMinPrice: action(
    (state, minPrice) => (state.searchFilters.minPrice = minPrice)
  ),
  setMaxPrice: action(
    (state, maxPrice) => (state.searchFilters.minPrice = maxPrice)
  ),
  setMinBdr: action((state, minBdr) => (state.searchFilters.minBdr = minBdr)),
  setMinSqft: action(
    (state, minSqft) => (state.searchFilters.minSqft = minSqft)
  ),
  setbHasGarage: action(
    (state, bHasGarage) => (state.searchFilters.bHasGarage = bHasGarage)
  ),
  selectedCity: { city: "", state: "" },
  setSelectedCity: action((state, obj) => {
    state.selectedCity = obj;
  })
};

export default model;
