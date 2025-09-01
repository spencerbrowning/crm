import { addNewContact, getContacts, getContactByID, updateContactByID, deleteContactByID } from "../controllers/crmController.ts";

const routes = (app) => {
    app.route('/contact')
        // GET all contacts
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getContacts)

        // POST a new contact
        .post(addNewContact)

        // GET contact by id
        app.route('/contact/:contactId')
        .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            next();
        }, getContactByID)

        // PUT update contact by id
        .put(updateContactByID)

        .delete(deleteContactByID);
}

export default routes;