import { Country } from 'country-state-city';
import { cache } from 'react';

export const getCountryList = cache(() => {
    return Country.getAllCountries();
});
