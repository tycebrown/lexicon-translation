(function () {
  window.addEventListener("message", (m) => {
    switch (m.data.messageType) {
      case "updateDocument":
        const xmlDoc = new DOMParser().parseFromString(
          m.data.documentContent,
          "text/xml"
        );
        document
          .getElementById("main")
          .replaceChildren(buildView(entryParser.toJSON(xmlDoc)));
        break;
    }
  });

  function buildView(documentData) {
    return raw.div(
      { margin: "44px 44px 0" },
      raw.div(
        raw.div({ fontSize: "36px" }, raw.text`${documentData.lemma}`),
        raw.div(
          { marginTop: "32px", fontWeight: "bold", fontStyle: "italic" },
          raw.text`${documentData.baseForms[0].partsOfSpeech[0]}`
        ),
        raw.ol(
          { margin: "24px 0 0 12px" },
          documentData.baseForms[0].meanings.map((meaning) =>
            raw.li(
              { marginBottom: "32px" },
              raw.div(raw.text`${meaning.senses[0].definitionShort}`),
              raw.div(
                {
                  marginTop: "8px",
                  fontWeight: "bold",
                },
                raw.text`Glosses: ${meaning.senses[0].glosses.join(", ")}`
              ),
              raw.div(
                { marginTop: "12px" },
                raw.text`References: `,
                meaning.references.map((reference, index) => [
                  index > 0 && raw.text`, `,
                  raw.span(raw.text`${reference}`),
                ])
              )
            )
          )
        )
      )
    );
  }
})();
