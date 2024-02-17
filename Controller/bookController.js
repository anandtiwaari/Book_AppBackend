const bookModal = require("../modal/bookModal");
const cloudinary = require("../utils/cloudinary");
// const cloudinaryyy = require("cloudinary");
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
  const { title, author, price, isFavourite, category } = req.body;
  console.log(req.file, "file requesr check");
  const result = await cloudinary.uploader.upload(req?.file?.path);
  console.log(result, "show the result here  of boks---");
  try {
    let newBookAdd = new bookModal({
      title: title,
      author: author,
      price: price,
      isFavourite: isFavourite,
      userId: req.userId,
      category: category,
      imageUrl: {
        imageUrl: result.url,
        originalImage: result.original_filename,
        public_id: result.public_id,
      },
    });
    const response = await newBookAdd.save();
    console.log(newBookAdd, "newBookAdd");
    console.log(req.userId, "newBookAdd user id");
    console.log(`Books have been added successFully`);
    res
      .status(201)
      .json({ message: `Data saved successFully`, user: response });
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
  console.log(payload, "payloadpayload ---");
  let userId = req.userId;
  console.log(userId, "show the userID");
  console.log(req.file, "show the req file here");
  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path, {
      public_id: req?.body?.public_id,
      overwrite: true,
    });
    console.log(result, "show the result here uiuiuiu");
  }
  try {
    const responseUpdate = await bookModal.findByIdAndUpdate(id, {
      ...payload,
      imageUrl: { ...payload?.imageUrl, imageUrl: result?.url },
    });
    let updatedResponseData = JSON.parse(JSON.stringify(responseUpdate));
    updatedResponseData = {
      ...updatedResponseData,
      imageUrl: { ...updatedResponseData?.imageUrl, imageUrl: result?.url },
    };
    console.log(updatedResponseData, "updatedResponseData");
    res.json({
      message: "Data Updated SuccessFully",
      data: updatedResponseData,
    });
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
