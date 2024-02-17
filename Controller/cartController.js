const cart = require("../modal/cartModal");

const cartController = async (req, res) => {
  const payload = req.body;
  console.log(req.userId);
  try {
    const data = await cart.findOneAndUpdate(
      //   {
      //     userId: req.userId,
      //     cartData: [newData],
      //   }
      { userId: req.userId },
      { $push: { cartData: payload } },
      {
        upsert: true,
      }
    );
    console.log(data, "show the data here now Cart");
    res.status(200).json({ message: "books added to cart successfully" });
  } catch (error) {
    console.log(error);
  }
};

const getAllCartData = async (req, res) => {
  try {
    const getAllData = await cart.find({ userId: req.userId });
    const cartData = getAllData.map((data) => {
      return data.cartData;
    });
    res.status(200).json({ data: cartData });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { cartController, getAllCartData };
