const { argv } = require("yargs");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((contacts) => console.log(contacts));
      break;

    case "get":
      getContactById(id).then((contact) =>
        console.log(contact || "Contact not found")
      );
      break;

    case "add":
      addContact(name, email, phone).then((contact) =>
        console.log("Added contact:", contact)
      );
      break;

    case "remove":
      removeContact(id).then((removedContact) => {
        if (removedContact) {
          console.log("Removed contact:", removedContact);
        } else {
          console.log("Contact not found");
        }
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
