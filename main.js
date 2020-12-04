"use strict";

let request = new XMLHttpRequest();
let xml;

request.onload = () => {
  if (request.status == 200) {
    xml = request.responseXML;
    console.log(xml);
    //transolateToBinary(askUser(), xml.querySelectorAll("letter"));
  } else {
    console.log("Problem with server");
  }
};

let translateToBinary = function () {
  clear();
  let letters = xml.querySelectorAll("letter");
  console.log(letters);
  console.log(userInput.value);
  let alphabeticals = userInput.value.split(" ");
  console.log(alphabeticals);
  alphabeticals.forEach(function (word) {
    for (let i = 0; i < word.length; i++) {
      // for every letter of every word...

      for (let j = 0; j < letters.length; j++) {
        let xmlElement = letters[j];
        let xmlLetter = xmlElement.getAttribute("letter");

        if (xmlLetter === word[i]) {
          //console.log(xmlLetter + " xmlChar equals userChar " + word[i]);
          console.log(
            xmlLetter +
              " equals " +
              xmlElement.querySelector("binary").textContent
          );
          createOutput(xmlElement.querySelector("binary").textContent, word[i]);
        }
      }
    }
  });
};

request.open("GET", "ascii.xml");
request.responseType = "document";
request.setRequestHeader("Accept", "text/xml");
request.send();

let userInput = document.querySelector("input");
userInput.addEventListener("keyup", translateToBinary);

let outputDiv = document.querySelector(".output");

let createOutput = function (binary, char) {
  let result = document.createElement("p");
  result.textContent = binary + " " + char;

  outputDiv.appendChild(result);
};

let clear = function () {
  while (outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.lastChild);
  }
};
