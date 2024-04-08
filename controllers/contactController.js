
const asyncHandler = require("express-async-handler")
// Get All contacts
// access public
// @route get.api/contacts

const Contact = require("../models/contactModel");

const getContact = asyncHandler (async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});


// Create New contacts
// access public
// @route get.api/contacts
const createContact =  asyncHandler (async (req, res) => {
    console.log('The request is :', req.body);

    // error handling
    const {name, email,phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error('All fields are mandatory !')
        // creating custom middleware
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
});

// @desc Update Contact
// @route PUT/ api/contacts/:id
// @access public

const updateContact = asyncHandler (async(req, res) => {
    const contact = await Contact.findById(req.param.id);
    if (!contact){
        res.status(400);
        throw new error("Contact not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(201).json({ message: `Update Contact for ${req.param.id}`});
});


// @desc Delete Contact
// @route DELETE/api/contacts/:id
// @access public
const deleteContact = asyncHandler (async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.deleteOne({ _id:req.params.id });
    res.status(201).json(contact);
});


// @desc Get Contac
// @route GET/api/contacts/:id
// @access public
const getContactbyid = asyncHandler(async(req, res) => {
    const contact  = await Contact.findById(req.params.id);
    if (!contact){
        res.json(404);
        throw new Error("Contact not found");
    }
    res.status(201).json(contact);
});

// async is used in case u r reading data from database
// since we do not know how long it will take to fetch the data

module.exports = { getContact, createContact, updateContact, deleteContact, getContactbyid }
