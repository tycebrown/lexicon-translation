(function () {
  window.addEventListener("message", (m) => {
    switch (m.data.messageType) {
      case "updateDocument":
        const xmlDoc = new DOMParser().parseFromString(
          m.data.documentContent,
          "text/xml"
        );
        buildEditor(entryParser.toJSON(xmlDoc));
        break;
    }
  });

  function buildEditor(documentData) {
    const lemmaElement = document.createElement("span");
    lemmaElement.innerText = documentData.lemma;

    const strongCodesElement = document.createElement("span");
    strongCodesElement.innerText = `(${documentData.strongCodes.join(", ")})`;

    const entryWordElement = document.createElement("div");
    entryWordElement.append(lemmaElement, " - ", strongCodesElement);

    const baseFormsList = document.createElement("ul");
    baseFormsList.append(
      ...documentData.baseForms.map((baseForm) => {
        const baseFormItem = document.createElement("li");
        const meaningsList = document.createElement("ul");

        meaningsList.append(
          ...baseForm.meanings.map((meaning) => {
            const meaningElement = document.createElement("div");
            meaningElement.innerText = meaning.id;
            return meaningElement;
          })
        );
        baseFormItem.append(baseForm.partsOfSpeech.join(", "), meaningsList);
        return baseFormItem;
      })
    );
    const main = document.getElementById("main");
    main.replaceChildren(entryWordElement, baseFormsList);
  }
})();
