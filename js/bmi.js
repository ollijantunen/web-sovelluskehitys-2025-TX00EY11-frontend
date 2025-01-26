const bmiDescriptions = {
  lowBmi:
    `Jos painoindeksi on alle 18,5, se merkitsee liiallista laihuutta.

    Laihuuden syynä voi olla jokin pitkällinen sairaus tai laihuushäiriö eli anoreksia. ` +
    `Jos varsinaista sairautta ei ole, mutta painoindeksi on laskenut alle 18,5:n, on syy tarpeen selvittää. ` +
    `Jos paino on muutamassa kuukaudessa laskenut yli 20:n tasolta reilusti, on varminta mennä lääkäriin jo painoindeksin lähestyessä 19:ää.

    Painoindeksin arvo 17 tai alle merkitsee vaarallista aliravitsemusta, jolloin on heti hakeuduttava hoitoon.
  
    Lähde: https://www.terveyskirjasto.fi/dlk01001`,
  normalBmi:
    `Normaaliksi määritellään se painoindeksin alue, jossa ihmisen terveys on parhaimmillaan. ` +
    `Normaali painoindeksin alue on välillä 18,5-25. ` +
    `Jos painoindeksi on pienempi kuin 18,5 tai suurempi kuin 25, sairauksien vaara suurenee.
    
    Yli 65-vuotiailla painoindeksi voi olla kohtuullisesti yli 25, ilman että sairauksien vaara suurenee. Heillä terveen painon alue on 23-29.
    
    Normaalipainon alue on varsin laaja. Painoindeksien 18,5 ja 25 väli on parikymmentä kiloa. ` +
    `Väljät normaalipainon rajat kuvastavat sitä, ettei ole olemassa tarkasti määriteltävää ihannepainoa, vaan paino voi olla täysin sopiva laajemmissa rajoissa.` +
    `Näihin rajoihin mahtuvat miehet ja naiset, tukevarakenteiset ja hoikkarakenteiset.
    
    Lähde: https://www.terveyskirjasto.fi/dlk01001`,
  highBmi:
    `Kun painoindeksi ylittää arvon 25, ollaan liikapainon puolella. ` +
    `Liikakilojen määrä voi vaihdella erittäin paljon, muutamasta kilosta moniin kymmeniin kiloihin. ` +
    `Siksi on hyödyllistä täsmentää, kuinka suuresta ylipainosta on kyse.
  
    Painoindeksin perusteella lihavuus luokitellaan vaikeusasteisiin seuraavasti:

    - 25-30: ylipaino eli lievä lihavuus
    - 30-35: merkittävä lihavuus
    - 35-40: vaikea lihavuus
    - Yli 40: sairaalloinen lihavuus.
  
    Lähde: https://www.terveyskirjasto.fi/dlk01001`,
};

// Haetaan muuttujiin dom-elementit
const bmiForm = document.querySelector(".bmi-form");
const heightInput = document.getElementById("bmi-form-height");
const weightInput = document.getElementById("bmi-form-weight");
const bmiScoreElement = document.querySelector("#bmi-score");
const bmiConclusionElement = document.querySelector("#bmi-conclusion");
const lowBmiTable = document.querySelector("#bmi-low");
const normalBmiTable = document.querySelector("#bmi-normal");
const highBmiTable = document.querySelector("#bmi-high");

// Muuttujien logitus testiksi
console.log(bmiForm);
console.log(heightInput);

// Luodaan kuuntelija formille
bmiForm.addEventListener("submit", (event) => {
  event.preventDefault();

  calculateBmi(getInputValues());
});

// Haetaan syöttäjän antamat arvot formista
const getInputValues = () => {
  const height = Number(heightInput.value);
  const weight = Number(weightInput.value);

  if (isNaN(height) || isNaN(weight)) {
    return { errorMessage: "Anna lukuarvot" };
  } else if (height <= 0 || weight <= 0) {
    return { errorMessage: "Anna positiiviset lukuarvot" };
  } else {
    return { height, weight };
  }
};

// Lasketaan BMI ja päivitetään tulos, analyysi ja ulkoasumuutokset näkymään
const calculateBmi = (input) => {
  if (input.errorMessage) {
    bmiScoreElement.innerText = input.errorMessage;
    bmiScoreElement.classList.add("userInputError");
  } else {
    const bmi = (input.weight / (input.height / 100) ** 2).toFixed(1);

    bmiScoreElement.classList.remove("userInputError");
    bmiScoreElement.innerText = bmi;

    if (bmi < 18.5) {
      bmiConclusionElement.innerText = bmiDescriptions.lowBmi;

      lowBmiTable.classList.add("bmi-low-selected");
      normalBmiTable.classList.remove("bmi-normal-selected");
      highBmiTable.classList.remove("bmi-high-selected");
    } else if (bmi > 25.0) {
      bmiConclusionElement.innerText = bmiDescriptions.highBmi;

      lowBmiTable.classList.remove("bmi-low-selected");
      normalBmiTable.classList.remove("bmi-normal-selected");
      highBmiTable.classList.add("bmi-high-selected");
    } else {
      bmiConclusionElement.innerText = bmiDescriptions.normalBmi;

      lowBmiTable.classList.remove("bmi-low-selected");
      normalBmiTable.classList.add("bmi-normal-selected");
      highBmiTable.classList.remove("bmi-high-selected");
    }
  }
};
