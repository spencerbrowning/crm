import mongoose from "mongoose";
import { ContactSchema } from '../models/crmModel.ts';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    let newContact = new Contact(req.body);

    interface ContactDocument extends mongoose.Document {
        // Add contact properties here based on your schema
        [key: string]: any;
    }

    try {
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        res.send(err);
    }
}

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (err) {
        res.send(err);
    }
}


export const getContactByID = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.contactId);
        res.json(contact);
    } catch (err) {
        res.send(err);
    }
};

export const updateContactByID = async (req, res) => {
    try {
        let updatedContact = await Contact.findByIdAndUpdate(
            { _id: req.params.contactId },
            req.body,
            { new: true } // Return the updated document
        );
        res.json(updatedContact);
    } catch (err) {
        res.send(err);
    }
};

export const deleteContactByID = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.contactId);
        res.json({ message: 'Contact successfully deleted' });
    } catch (err) {
        res.send(err);
    }
};