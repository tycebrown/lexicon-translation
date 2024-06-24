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
    main.append(document.createElement());
    const entryContainerElement = document.createElement("div");
    entryContainerElement.style = "margin: 44px 44px 0;";

    const baseFormElement = document.createElement("div");

    const lemmaElement = document.createElement("div");
    lemmaElement.style = "font-size: 36px;";
    lemmaElement.textContent = documentData.lemma;

    const partOfSpeechElement = document.createElement("div");
    partOfSpeechElement.style =
      "margin-top: 32px; font-weight: bold; font-style: italic;";
    partOfSpeechElement.textContent =
      documentData.baseForms[0].partsOfSpeech[0];

    const meaningElementsList = document.createElement("ol");
    meaningElementsList.style = "margin: 24px 0 0 12px;";
    meaningElementsList.append(
      ...documentData.baseForms[0].meanings.map((meaning) => {
        const meaningElement = document.createElement("li");
        meaningElement.style = "margin-bottom: 32px;";

        const definitionShortElement = document.createElement("div");
        definitionShortElement.textContent = meaning.senses[0].definitionShort;

        const glossesElement = document.createElement("div");
        glossesElement.style = "margin-top: 8px; font-weight: bold;";
        glossesElement.textContent =
          "Glosses: " + meaning.senses[0].glosses.join(", ");

        const referencesElement = document.createElement("div");
        referencesElement.className = "reference-list";
        referencesElement.style = "margin-top: 12px;";
        referencesElement.append(
          "References: ",
          ...meaning.references.flatMap((reference) => {
            const referenceElement = document.createElement("span");
            referenceElement.textContent = reference;
            return referenceElement;
          })
        );

        meaningElement.append(
          definitionShortElement,
          glossesElement,
          referencesElement
        );

        return meaningElement;
      })
    );

    baseFormElement.append(
      lemmaElement,
      partOfSpeechElement,
      meaningElementsList
    );
    entryContainerElement.append(baseFormElement);
    main.replaceChildren(entryContainerElement);
  }
})();
