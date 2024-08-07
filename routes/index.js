const router = require("express").Router();
const products = require("../data/products.json");
// const products = [];
const fs = require("fs");

// manampilkan semua products
// filtering/searching
router.get("/", (req, res) => {
  const { q } = req.query; // query string
  let filteredData = [...products];

  if (q) {
    filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  res.render("layout", { products: filteredData, view: "products" });
});

router.get("/products", (req, res) => {
  res.redirect("/");
});

// menampilkan 1 product berdasarkan id
router.get("/products/:id", (req, res) => {
  const { id } = req.params; // route paramter
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return res.status(404).send("Product Not Found");
  }

  res.render("layout", { product, view: "product" });
});

// membeli product berdasarkan id

router.get("/buy/:id", (req, res) => {
  const { id } = req.params; // route paramter
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return res.status(404).send("Product Not Found");
  }

  res.render("layout", { product, view: "buy" });
});

router.post("/buy/:id", (req, res) => {
  // mengurangi stock
  // nemambahkan ke data order
  const { id } = req.params; // route paramter
  const { qty } = req.body; // post parameter
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return res.status(404).send("Product Not Found");
  }

  product.stock -= Number(qty);

  const data = JSON.stringify(products, null, 2);
  fs.writeFile("./data/products.json", data, (err) => {
    if (err) {
      return res.status(500).send("Error while buying product");
    }

    res.status(201).send("Berhasil melakukan pembelian product"); // created
  });
});

module.exports = router;
