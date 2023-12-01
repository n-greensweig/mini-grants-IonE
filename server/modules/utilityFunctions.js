//Returns a first and last name object given a single string containing the full name
function parseName(fullName) {
    let names = fullName.split(/, | /); // Splitting based on comma or space

    if (names.length === 2) {
        return {
            firstName: names[1],
            lastName: names[0]
        };
    } else {
        // Assuming the default order as first name followed by last name
        return {
            firstName: names[0],
            lastName: names[1]
        };
    }
}


//Spring grant cycle opens third monday of March
function thirdMondayOfMarch(year) {
    const march = new Date(year, 2, 1); // Month in JavaScript is 0-based (0: January, 1: February, ...)
    let count = 0;
  
    // Iterate through the days of March
    for (let i = 1; i <= 31; i++) {
      march.setDate(i);
  
      // Check if the day is a Monday (getDay() returns 1 for Monday)
      if (march.getDay() === 1) {
        count++;
  
        // If it's the third Monday, return the date
        if (count === 3) {
          return march;
        }
      }
    }
  
    return 'error';
  }
  
//Spring grant cycle closes last Sunday of April
 function lastSundayOfApril(year) {
    const april = new Date(year, 3, 30); // Start at the last day of April
  
    while (april.getDay() !== 0) {
      // Move back one day until it's a Sunday (getDay() returns 0 for Sunday)
      april.setDate(april.getDate() - 1);
    }
  
    return april;
  }

  //Fall grant cycle opens second Monday of September
  function secondMondayOfSeptember(year) {
    const september = new Date(year, 8, 1); // Month in JavaScript is 0-based (8: September)
    let count = 0;
  
    // Iterate through the days of September
    for (let i = 1; i <= 30; i++) {
      september.setDate(i);
  
      // Check if the day is a Monday (getDay() returns 1 for Monday)
      if (september.getDay() === 1) {
        count++;
  
        // If it's the second Monday, return the date
        if (count === 2) {
          return september;
        }
      }
    }
}

function penultimateSundayOfOctober(year) {
    const october = new Date(year, 9, 31); // Start at the last day of October
  
    // Move back one week to ensure it's within October
    october.setDate(october.getDate() - 7);
  
    while (october.getDay() !== 0) {
      // Move back one day until it's a Sunday (getDay() returns 0 for Sunday)
      october.setDate(october.getDate() - 1);
    }
  
    return october;
  }

  module.exports = { thirdMondayOfMarch, lastSundayOfApril, secondMondayOfSeptember, penultimateSundayOfOctober };