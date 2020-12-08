exports.users = require('./users');
var postal_type = '';
var postal_choice = '';
document.getElementById('postalType').addEventListener('selectionchange', function() {
                postal_type = document.getElementById('postalType');
                postal_choice = postal_type.options[postal_type.selectedIndex].value;
            }
);
var weightOne = document.getElementById('postalWeight1');
var weightTwo = document.getElementById('postalWeight2');
var weightFlag1 = 0;
var weightFlag2 = 0;
document.getElementById('typeBtn').addEventListener('click', 
function() {
    var settingOne = weightOne.style.display;
    var settingTwo = weightTwo.style.display;
    // now toggle the clock and the button text, depending on current state
    if (postal_choice == 1 || postal_choice == 2) {
        if (settingOne == 'none') {
            weightOne.style.display = 'block';
            weightFlag1 = 1;
        }
        if (settingTwo == 'block') {
            weightTwo.style.display = 'none';
            weightFlag2 = 0;
        }
    }
    if (postal_choice == 3 || postal_choice == 4) {
        if (settingOne == 'block') {
            weightOne.style.display = 'one';
            weightFlag1 = 0;
        }
        if (settingTwo == 'none') {
            weightTwo.style.display = 'block';
            weightFlag2 = 1;
        }
    }
    
});
postal_weight_init = "";
postal_weight = "";

if (weightFlag1 == 1 && weightFlag2 == 0) {
   document.getElementById('postalWeight1').addEventListener('change', function() {
        postal_weight_init = document.getElementById('postalWeight1');
        postal_weight = postal_weight_init.options[postal_weight_init.selectedIndex].value;
        }
    );
}   
else if (weightFlag1 == 0 && weightFlag2 == 1) {
    document.getElementById('postalWeight2').addEventListener('change', function() {
    postal_weight_init = document.getElementById('postalWeight2');
    postal_weight = postal_weight_init.options[postal_weight_init.selectedIndex].value;
    });
}   

 
document.getElementById('weightBtn').addEventListener('click', getPostalPrice(postal_weight));

function getPostalPrice(weight) {
    var priceDiv = document.createElement('div');    
    priceDiv.classList.add('postalDiv');
    priceDiv.setAttribute('id', 'priceDiv');
    priceDiv.setAttribute('name', 'priceDiv');

    var pPrice = document.createElement('p');
    pPrice.setAttribute('class', 'finalPrice');
    pPrice.setAttribute('id', 'finalPrice');
    pPrice.setAttribute('name', 'finalPrice');
    var finalPrice = 0;
    var weightNum = postal_weight.value; 
    var type = postal_choice;
    var typeDescript = "";
    switch(type) {
        case 1:
            finalPrice = getLetterPrice(type, weight);
            typeDescript = 'First Class Letter - Stamped';
            break;
        case 2: 
            finalPrice = getLetterPrice(type, weight);
            typeDescript = 'First Class Letter - Metered';
            break;
        case 3:
            finalPrice = getEnvPrice(weight);
            typeDescript = 'First Class Large Envelopes';
            break;
        case 4:
            finalPrice = getPckgPrice(weight);
            typeDescript = 'First Class Package Service Retail';
            break;
    }
    pPrice.innerText = "Your Price for " + typeDescript + "with weight " + Number(weightNum) + ": $" + Number(finalPrice);
    priceDiv.appendChild(pPrice); 
    document.getElementById('weightDiv').appendChild(priceDiv);
}
//called by getPostalPrice() using weight to determine final price for return
function getLetterPrice(type, weight) {
    if (weight <= 1) {
        if (type == 1) {
            price = .55;
        }
        if (type == 2) {
            price = .5;
        }
        if (weight <= 2) {
            price += .15;
            if (weight <= 3) {
                price += .15;
            if (weight <= 3.5) {
                price += .15;
                }
            }
        } 
    }
    return price;
}
//called by getPostalPrice() using weight to determine final price for return
//this is a VERY, VERY nasty nested if situ, I will do the math to fix it later
function getEnvPrice(weight) {
    if (weight <= 1) {
        price = 1;
        if (weight <= 2) {
            price += .2;
            if (weight <= 3) {
                price += .2;
                if (weight <= 4) {
                    price += .2;
                    if(weight <= 5) {
                        price += .2;
                        if (weight <= 6) {
                            price += .2;
                            if (weight <= 7) {
                                price +=.2;
                                if (weight <= 8) {
                                    price += .2;
                                    if (weight <= 9) {
                                        price += .2;
                                        if (weight <= 10) {
                                            price += .2;
                                            if (weight <= 11) {
                                                price += .2;            
                                                if (weight <=12) {
                                                    price += .2;
                                                    if (weight <=13 || weight > 13) {
                                                        price += .2;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
    return price;
}
//called by getPostalPrice() using weight to determine final price for return
function getPckgPrice(weight) {
    var price = 0;
    if (weight <= 4) {
        price = 3.8;
        if (weight <= 8) {
            price += .8;
            if (weight <= 12) {
                price += 1.5;
                if (weight <= 13) {
                    price += .6;
                }
            }
        }
    }
        return price;
}
