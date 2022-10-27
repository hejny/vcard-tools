const namesElement = document.getElementById("names") as HTMLTextAreaElement;
const noteElement = document.getElementById("note") as HTMLInputElement;
const vcardElement = document.getElementById("vcard") as HTMLInputElement;

namesElement.addEventListener("keydown", convertNamesToVcard);
namesElement.addEventListener("change", convertNamesToVcard);
noteElement.addEventListener("keydown", convertNamesToVcard);
noteElement.addEventListener("change", convertNamesToVcard);

convertNamesToVcard();

async function convertNamesToVcard() {
  await forImmediate();
  const note = noteElement.value.trim() || null;
  vcardElement.innerHTML = namesElement.value
    .split("\n")
    .flatMap((name) => [
      `BEGIN:VCARD`,
      `VERSION:3.0`,
      `FN:${name}`,
      note ? `NOTE:${note}` : null,
      `END:VCARD`,
    ])
    .filter((row) => row != null)
    .join("\n");
}

function forImmediate(): Promise<void> {
  // Note: Not using setImmediate because it is non-standard feature only in browser window
  //       @see https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate

  return new Promise((resolve) => {
      setTimeout(() => {
          resolve();
      }, 1);
  });
}


// TODO: !!! Same async+forImmediate everyhere
// TODO: !!! Same naming convertNamesToVcard everyhere
// TODO: !!! Same HTMLInputElement readonly everyhere
// TODO: !!! Create for all tools menu OR backink to main README
// TODO: !!! Reflect input into URL after the hash part #