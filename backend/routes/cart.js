const {
  verifyToken,
  verifyandAuthorize,
  verifyandAdmin,
} = require("../middlewares/verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyandAuthorize, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json("Wrong Credentials!!");
  }
});

//DELETE
router.delete("/:id", verifyandAuthorize, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart deleted SuccessFully!!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CART
router.get("/getcart/:userId", verifyandAuthorize, async (req, res) => {
  try {
    const cart = await Cart.findById({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET All
router.get("/getallcarts", verifyandAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
