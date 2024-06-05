(function () {
  window.addEventListener("message", (m) => {
    switch (m.data.messageType) {
      case "updateDocument":
        const xmlDoc = new DOMParser().parseFromString(
          m.data.documentContent,
          "text/xml"
        );
        buildEditor(toJSON(xmlDoc));
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

  function toJSON(xmlDoc) {
    return {
      id: xmlDoc.documentElement.getAttribute("Id")?.slice(0, 6),
      lemma: xmlDoc.documentElement.getAttribute("Lemma"),
      strongCodes: [...xmlDoc.getElementsByTagName("Strong")].map(
        (strongTag) => strongTag.textContent
      ),
      authors: [...xmlDoc.getElementsByTagName("Author")].map(
        (authorTag) => authorTag.textContent
      ),
      baseForms: [...xmlDoc.getElementsByTagName("BaseForm")].map(
        (baseFormTag) => ({
          id: baseFormTag.getAttribute("Id")?.slice(6, 9),
          partsOfSpeech: [
            ...baseFormTag.getElementsByTagName("PartOfSpeech"),
          ].map((partOfSpeechTag) => partOfSpeechTag.textContent),
          meanings: [...baseFormTag.getElementsByTagName("LEXMeaning")].map(
            (meaningTag) => ({
              id: meaningTag.getAttribute("Id")?.slice(9, 12),
              domains: [...meaningTag.getElementsByTagName("LEXDomain")].map(
                (domainTag) => domainTag.textContent
              ),
              subDomains: [
                ...meaningTag.getElementsByTagName("LEXSubDomain"),
              ].map((subDomainTag) => subDomainTag.textContent),
              coreDomains: [
                ...meaningTag.getElementsByTagName("LEXCoreDomain"),
              ].map((coreDomainTag) => coreDomainTag.textContent),
              senses: [...meaningTag.getElementsByTagName("LEXSense")].map(
                (senseTag) => ({
                  definitionLong:
                    senseTag.getElementsByTagName("DefinitionLong")[0]
                      .textContent,
                  definitionShort:
                    senseTag.getElementsByTagName("DefinitionShort")[0]
                      .textContent,
                  glosses: [...senseTag.getElementsByTagName("Gloss")].map(
                    (glossTag) => glossTag.textContent
                  ),
                  comments:
                    senseTag.getElementsByTagName("Comments")[0].textContent,
                })
              ),
              collocations: [
                ...meaningTag.getElementsByTagName("LEXCollocation"),
              ].map((collocationTag) => collocationTag.textContent),
              references: [
                ...meaningTag.getElementsByTagName("LEXReference"),
              ].map((referenceTag) => referenceTag.textContent),
            })
          ),
        })
      ),
    };
  }
})();
