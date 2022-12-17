"use strict";
//////////////////////
// ----- KEY ----- //
////////////////////
const personalAllowance = 12570; //0%
const basicRate = 50270; //20%
const higherRate = 150000; //40%
const additionalRate = 150001; //45%

////////////////////////
// ----- INPUT ----- //
//////////////////////
document.querySelector(".submitBtn").addEventListener("click", function () {
  //Pay
  const hourlyWage = parseFloat(document.getElementById("pay").value);
  console.log(hourlyWage, typeof hourlyWage);

  //Hours
  const hoursWorked = parseFloat(document.querySelector(".hours").value);
  console.log(hoursWorked);

  //Math
  const wagePerCalendarMonth = (hourlyWage * hoursWorked * 52) / 12;
  const wageToAnnual = hourlyWage * hoursWorked * 52;

  const wageToWeekly = wageToAnnual / 52;
  console.log(wageToWeekly);
  const nationalInsuranceLow = ((wageToWeekly - 242) * 12) / 100;
  const nationalInsuranceHigh = nationalInsuranceLow + ((wageToWeekly - 967) * 2) / 100;
  console.log(nationalInsuranceHigh);

  const monthlyNationalInsuranceLow = nationalInsuranceLow * 4;
  const monthlyNationalInsuranceHigh = nationalInsuranceHigh * 4;

  // Breakdown
  document.querySelector(".breakdown").innerHTML =
    "Your annual gross salary (pay before deductions) is £" +
    Math.round(wageToAnnual) +
    "<br />" +
    "Your monthly gross salary (pay before deductions) is £" +
    Math.round(wagePerCalendarMonth);

  if (wageToAnnual > personalAllowance && wageToAnnual < basicRate && wageToWeekly > 242 && wageToWeekly < 967) {
    document.querySelector(".breakdown1").innerHTML =
      "You have £" +
      (wageToAnnual - personalAllowance) +
      " per annum that is considered taxable income." +
      "<br />" +
      "This means you must pay £" +
      ((wageToAnnual - personalAllowance) * 20) / 100 +
      " per year in tax, or, £" +
      Math.round(((wageToAnnual - personalAllowance) * 20) / 100 / 12) +
      " per month in tax.";

    document.querySelector(".breakdown2").innerHTML =
      "Because you earn over £242 per week, you will also have to pay £" +
      nationalInsuranceLow +
      " each week for your National Insurance contributions, or, £" +
      monthlyNationalInsuranceLow +
      " per month.";

    document.querySelector(".breakdown3").innerHTML =
      "Your monthly net pay (wages minus deductions) will be £" +
      Math.round(
        wagePerCalendarMonth - ((wageToAnnual - personalAllowance) * 20) / 100 / 12 - monthlyNationalInsuranceLow
      );

    //Higher Rate
  } else if (wageToAnnual > basicRate && wageToAnnual < higherRate && wageToWeekly > 242 && wageToWeekly > 967) {
    document.querySelector(".breakdown1").innerHTML =
      "You have £" +
      (wageToAnnual - personalAllowance) +
      " per annum that is considered taxable income." +
      "<br />" +
      "This means you must pay £" +
      ((wageToAnnual - personalAllowance) * 40) / 100 +
      " per year in tax, or, £" +
      Math.round(((wageToAnnual - personalAllowance) * 40) / 100 / 12) +
      " per month in tax." +
      "<br />" +
      "Because you earn over £967 per week, you will also have to pay £" +
      Math.round(nationalInsuranceHigh) +
      " each week for your National Insurance contributions, or, £" +
      Math.round(monthlyNationalInsuranceHigh) +
      " per month." +
      "<br />" +
      "Your monthly net pay (wages minus deductions) will be £" +
      Math.round(
        wagePerCalendarMonth - ((wageToAnnual - personalAllowance) * 20) / 100 / 12 - monthlyNationalInsuranceHigh
      );

    //Additional Rate
  } else if (wageToAnnual >= higherRate && wageToWeekly > 242 && wageToWeekly > 967) {
    document.querySelector(".breakdown1").innerHTML =
      "You have £" +
      (wageToAnnual - personalAllowance) +
      " per annum that is considered taxable income." +
      "<br />" +
      "This means you must pay £" +
      ((wageToAnnual - personalAllowance) * 45) / 100 +
      " per year in tax, or, £" +
      Math.round(((wageToAnnual - personalAllowance) * 45) / 100 / 12) +
      " per month in tax." +
      "<br />" +
      "Because you earn over £967 per week, you will also have to pay £" +
      Math.round(nationalInsuranceHigh) +
      " each week for your National Insurance contributions, or, £" +
      Math.round(monthlyNationalInsuranceHigh) +
      " per month." +
      "<br />" +
      "Your monthly net pay (wages minus deductions) will be £" +
      Math.round(
        wagePerCalendarMonth - ((wageToAnnual - personalAllowance) * 20) / 100 / 12 - monthlyNationalInsuranceHigh
      );
  } else {
    document.querySelector(
      ".breakdown1"
    ).innerHTML = `You do not qualify for any deducations. As a result, you do not need to pay anything.`;
  }
});
// console.log(parseFloat(hourlyWage));
//console.log(parseFloat(hoursWorked));
