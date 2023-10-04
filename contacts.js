const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  return fs.readFile(contactsPath, "utf-8").then((data) => JSON.parse(data));
}

function getContactById(contactId) {
  return listContacts().then((contacts) =>
    contacts.find(({ id }) => id === contactId)
  );
}

function removeContact(contactId) {
  return listContacts()
    .then((contacts) => contacts.filter(({ id }) => id !== contactId))
    .then((newContacts) => {
      return fs
        .writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
        .then(() => newContacts);
    });
}

function addContact(name, email, phone) {
  return listContacts().then((contacts) => {
    const newContact = { id: String(Math.random()), name, email, phone };
    contacts.push(newContact);
    return fs
      .writeFile(contactsPath, JSON.stringify(contacts, null, 2))
      .then(() => newContact);
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
