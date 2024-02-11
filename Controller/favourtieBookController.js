const bookModal = require("../modal/bookModal");

const markFavourite = async (req, res) => {
  const id = req.params.id;
  console.log("id: ", id);
  const markFavourite = await bookModal.findById(id);
  if (markFavourite?.isFavourite == false) {
    await bookModal?.findByIdAndUpdate(id, {
      isFavourite: true,
    });
    return res?.send("Book Marked favourite Successfully");
  }
};

const markUnFavourite = async (req, res) => {
  const id = req.params.id;
  console.log("id: ", id);
  const markFavourite = await bookModal.findById(id);
  if (markFavourite?.isFavourite == true) {
    await bookModal?.findByIdAndUpdate(id, {
      isFavourite: false,
    });
  }
  res?.send("Book Marked favourite Successfully");
};

const getAllFavouritesBook = async (req, res) => {
  console.log(req.userId, "req.userId");
  const favouriteData = await bookModal.find({
    isFavourite: true,
    userId: req.userId.toString(),
  });
  console.log(favouriteData, "favouriteData");
  res.json(favouriteData);
};

module.exports = {
  markFavourite,
  markUnFavourite,
  getAllFavouritesBook,
};
