const bookModal = require("../modal/bookModal");

const getAllBooks = async (req, res) => {
  console.log(req.userId, "show the request user id");
  try {
    const allBookData = await bookModal.find({ userId: req.userId });
    res.json(allBookData);
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

const AddBooks = async (req, res) => {
  const { title, author, price, isFavourite } = req.body;

  try {
    let newBookAdd = new bookModal({
      title: title,
      author: author,
      price: price,
      isFavourite: isFavourite,
      userId: req.userId,
    });
    let response = await newBookAdd.save();
    console.log(newBookAdd, "newBookAdd");
    console.log(response, "show the added response");
    console.log(req.userId, "newBookAdd user id");
    console.log(`Books have been added successFully`);
    res.status(201).json({
      message: "Books have been added successFully",
      data: response,
    });
  } catch (error) { 
    res.status(500).send(error.message);
    console.log(error);
  }
};

const getSingleBooks = async (req, res) => {
  let id = req.params.id;
  try {
    const getSingleBook = await bookModal.findById(id);
    if (getSingleBook) {
      res.json(getSingleBook);
    }
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

const deleteBook = async (req, res) => {
  let id = req.params.id;
  try {
    await bookModal.findByIdAndDelete(id);
    res.send("Data successFully Deleted");
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

const updateBooks = async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  let userId = req.userId;
  console.log(userId, "show the userID");
  console.log(payload, "payloadpayload");
  try {
    await bookModal.findByIdAndUpdate(id, payload);
    res.send("Data Updated SuccessFully");
  } catch (error) {
    res.status(500).send(error?.message);
  }
};

module.exports = {
  getAllBooks,
  AddBooks,
  getSingleBooks,
  deleteBook,
  updateBooks,
};
