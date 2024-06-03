(function () {
  console.log("Helo from script");
  window.addEventListener("message", (m) => {
    console.log("++++++++++++++ message");
    switch (m.data.messageType) {
      case "updateDocument":
        buildEditor(m.data.documentContent);
        break;
      default:
        console.log("Default");
    }
  });

  function buildEditor(documentContent) {
    const xmlDoc = new DOMParser().parseFromString(documentContent, "text/xml");
    document.getElementById("main").innerHTML =
      "<pre>" + JSON.stringify(toJSON(xmlDoc), null, 2) + "</pre>";
  }
  function toJSON(xmlDoc) {
    return {
      id: xmlDoc.documentElement.getAttribute("Id")?.slice(0, 6),
      text: xmlDoc.documentElement.getAttribute("Lemma"),
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
          lexMeanings: [...baseFormTag.getElementsByTagName("LEXMeaning")].map(
            (lexMeaningTag) => ({
              id: lexMeaningTag.getAttribute("Id")?.slice(9, 12),
              lexSenses: [
                ...lexMeaningTag.getElementsByTagName("LEXSense"),
              ].map((lexSenseTag) => ({
                definitionLong:
                  lexSenseTag.getElementsByTagName("DefinitionLong")[0]
                    .textContent,
                definitionShort:
                  lexSenseTag.getElementsByTagName("DefinitionShort")[0]
                    .textContent,
                glosses: [...lexSenseTag.getElementsByTagName("Gloss")].map(
                  (glossTag) => glossTag.textContent
                ),
              })),
            })
          ),
        })
      ),
    };
  }
})();
