entryParser = {
  toJSON(xmlDoc) {
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
              references: [
                ...meaningTag.getElementsByTagName("LEXReference"),
              ].map((referenceTag) => referenceTag.textContent),
            })
          ),
        })
      ),
    };
  },
};
