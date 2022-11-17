$("[data-name='llc-states-price']").on("input", function () {
  if ($(this).val() != "") {
    $("#llc-price-text").text($(this).val());
  }
});
$("[data-name='corp-states-price']").on("change", function () {
  $("#corp-price-text").text($(this).val());
});
$("[data-name='scorp-states-price']").on("change", function () {
  $("#scorp-price-text").text($(this).val());
});
$("[data-name='sales-states-price'],[data-name='global-profit-sales']").on(
  "change",
  function () {
    var state_tax_val = $("#sales-states-price").val();
    var state_budget_val = $("#global-profit-sales").val();

    $("#sales-price-text").text((state_tax_val * state_budget_val) / 100);
  }
);

$("[data-name='global-profit'], [data-name='income-company-type']").on(
  "change",
  function () {
    var globalProfit = $("#global-profit").val();
    var taxToPay = 0;

    var t1 = 10275;
    var t2 = 41775;
    var t3 = 89075;
    var t4 = 170050;
    var t5 = 215950;
    var t6 = 539900;

    var p1 = 0.1;
    var p2 = 0.12;
    var p3 = 0.22;
    var p4 = 0.24;
    var p5 = 0.32;
    var p6 = 0.35;
    var p7 = 0.37;

    //LLC
    if (
      $("#income-company-type").val() == 1 ||
      $("#income-company-type").val() == 3
    ) {
      if (globalProfit <= t1) {
        taxToPay += globalProfit * p1;
      } else {
        taxToPay += t1 * p1;
      }
      if (globalProfit > t1) {
        if (globalProfit <= t2) {
          taxToPay += (globalProfit - t1) * p2;
        } else {
          taxToPay += (t2 - t1) * p2;
        }
      }
      if (globalProfit > t2) {
        if (globalProfit <= t3) {
          taxToPay += (globalProfit - t2) * p3;
        } else {
          taxToPay += (t3 - t2) * p3;
        }
      }
      if (globalProfit > t3) {
        if (globalProfit <= t4) {
          taxToPay += (globalProfit - t3) * p4;
        } else {
          taxToPay += (t4 - t3) * p4;
        }
      }
      if (globalProfit > t4) {
        if (globalProfit <= t5) {
          taxToPay += (globalProfit - t4) * p5;
        } else {
          taxToPay += (t5 - t4) * p5;
        }
      }
      if (globalProfit > t5) {
        if (globalProfit <= t6) {
          taxToPay += (globalProfit - t5) * p6;
        } else {
          taxToPay += (t6 - t5) * p6;
        }
      }
      if (globalProfit > t6) {
        taxToPay += (globalProfit - t6) * p7;
      }
    }
    //CORP
    if ($("#income-company-type").val() == 2) {
      taxToPay = globalProfit * 0.21;
    }

    $("#income-tax-text").text(taxToPay);
  }
);

var form = document.querySelector("[data-name=tax-form]");
form.addEventListener("submit", handlerCallback, true);
function handlerCallback(event) {
  event.preventDefault();
  event.stopPropagation();
}

$("#income-company-type").on("input", function () {
  if ($("#income-company-type option:selected").text().indexOf("LLC-P") >= 0) {
    $(".partner-shares, .results-wrapper.llc-p").removeClass("hide");
    $(".results-wrapper.other").addClass("hide");
  } else {
    $(".partner-shares, .results-wrapper.llc-p").addClass("hide");
    $(".results-wrapper.other").removeClass("hide");
  }
});

// LLC-P

window.addEventListener("load", () => {
  // let t1 = 10275;
  // let t2 = 41775;
  // let t3 = 89075;
  // let t4 = 170050;
  // let t5 = 215950;
  // let t6 = 539900;
  let p1 = 0.1;
  let p2 = 0.12;
  let p3 = 0.22;
  let p4 = 0.24;
  let p5 = 0.32;
  let p6 = 0.35;
  let p7 = 0.37;
  let form = document.querySelector("#wf-form-tax-form");
  let globalProfit,
    ownership,
    partnerProfit,
    taxDeclaration,
    tax,
    withholdingTax,
    taxReturn,
    tax_to_pay,
    tax_to_pay_quote,
    tax_to_pay_lower_quote,
    tax_to_pay_from_profit;
  form.addEventListener("change", () => {
    globalProfit = document.querySelector("#global-profit").value;
    ownership = document.querySelector("#Type-Percantage").value;
    partnerProfit = document.querySelector("#partners-profit");
    taxDeclaration = document.querySelector("#tax-declaration");
    tax = document.querySelector("#tax");
    withholdingTax = document.querySelector("#withholding-tax");
    taxReturn = document.querySelector("#tax-return");
    let partnerProfitValue = parseInt((globalProfit * ownership) / 100);
    partnerProfit.innerHTML = partnerProfitValue;
    let withholdingTaxValue = Math.ceil(
      (globalProfit * 0.37 * ownership) / 100
    );
    withholdingTax.innerHTML = withholdingTaxValue;
    tax_to_pay = p1;
    tax_to_pay_quote = 0;
    tax_to_pay_from_profit = 0.1;
    tax_to_pay_lower_quote = 0;
    if (partnerProfitValue > 10275) {
      tax_to_pay_from_profit = 0.12;
    }
    if (partnerProfitValue > 41775) {
      tax_to_pay_from_profit = 0.22;
    }
    if (partnerProfitValue > 89075) {
      tax_to_pay_from_profit = 0.24;
    }
    if (partnerProfitValue > 170050) {
      tax_to_pay_from_profit = 0.32;
    }
    if (partnerProfitValue > 215950) {
      tax_to_pay_from_profit = 0.35;
    }
    if (partnerProfitValue > 539900) {
      tax_to_pay_from_profit = 0.37;
    }
    if (globalProfit > 10275) {
      tax_to_pay = p2;
      tax_to_pay_quote = 1027.5;
      tax_to_pay_lower_quote = 10275;
    }
    if (globalProfit > 41775) {
      tax_to_pay = p3;
      tax_to_pay_quote = 4807.5;
      tax_to_pay_lower_quote = 41775;
    }
    if (globalProfit > 89075) {
      tax_to_pay = p4;
      tax_to_pay_quote = 15213.5;
      tax_to_pay_lower_quote = 89075;
    }
    if (globalProfit > 170050) {
      tax_to_pay = p5;
      tax_to_pay_quote = 34647.5;
      tax_to_pay_lower_quote = 170050;
    }
    if (globalProfit > 215950) {
      tax_to_pay = p6;
      tax_to_pay_quote = 49335.5;
      tax_to_pay_lower_quote = 215950;
    }
    if (globalProfit > 539900) {
      tax_to_pay = p7;
      tax_to_pay_quote = 162718.5;
      tax_to_pay_lower_quote = 215950;
    }
    console.log("partnerProfitValue:" + partnerProfitValue);
    console.log("tax_to_pay_lower_quote: " + tax_to_pay_lower_quote);
    console.log(partnerProfitValue - tax_to_pay_lower_quote);
    console.log("tax_to_pay_from_profit: "+tax_to_pay_from_profit);
    console.log((partnerProfitValue - tax_to_pay_lower_quote) * tax_to_pay_from_profit);
    console.log(tax_to_pay_quote);
    let taxDeclarationValue = parseInt(
      (partnerProfitValue - tax_to_pay_lower_quote) * tax_to_pay_from_profit +
        tax_to_pay_quote
    );
    taxDeclaration.innerHTML = taxDeclarationValue;
    tax.innerHTML =
      Math.ceil((taxDeclarationValue * 10000) / partnerProfitValue) / 100;
    taxReturn.innerHTML = withholdingTaxValue - taxDeclarationValue;
  });
});
