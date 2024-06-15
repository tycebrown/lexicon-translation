(function () {
  window.addEventListener("message", (m) => {
    switch (m.data.messageType) {
      case "updateDocument":
        const xmlDoc = new DOMParser().parseFromString(
          m.data.documentContent,
          "text/xml"
        );
        buildViewer(entryParser.toJSON(xmlDoc));
        break;
    }
  });

  function buildViewer(documentData) {
    const main = document.getElementById("main");
    const entryContainerElement = document.createElement("div");
    entryContainerElement.style = "margin: 44px 44px 0;";

    const baseFormElement = document.createElement("div");

    const lemmaElement = document.createElement("div");
    lemmaElement.style = "font-size: 36px;";
    lemmaElement.innerText = documentData.lemma;

    const partOfSpeechElement = document.createElement("div");
    partOfSpeechElement.style =
      "margin-top: 32px; font-weight: bold; font-style: italic;";
    partOfSpeechElement.innerText = documentData.baseForms[0].partsOfSpeech[0];

    const meaningElementsList = document.createElement("ol");
    meaningElementsList.append(
      ...documentData.baseForms[0].meanings.map((meaning) => {
        const meaningElement = document.createElement("li");
        meaningElement.style = "margin: 24px 0 0 12px;";
        meaningElement.innerText = meaning.senses[0].definitionShort;
      })
    );

    baseFormElement.append(lemmaElement, partOfSpeechElement);
    entryContainerElement.append(baseFormElement);
    main.replaceChildren(entryContainerElement);
  }
})();
