export default {
   filterAndSort: (airports, input = '') => {
    // const input = (filterType === 'from') ? this.state.sourceFilterValue : this.state.destinationFilterValue;
    const escapedInput = input.trim().toLowerCase().split('-')[0];
    const airportMatchRegex = new RegExp('\\b' + escapedInput, 'i');
    const suggestions = airports
            .filter(airport => airportMatchRegex.test(airport.city))
            .sort((airport1, airport2) => {
              airport1.city.toLowerCase().indexOf(escapedInput) - airport2.city.toLowerCase().indexOf(escapedInput);
            })
            .slice(0, 7)
            .map(airport => `${ airport.city} - ${ airport.country } (${ airport.code })`);

    return suggestions;
  },

}
