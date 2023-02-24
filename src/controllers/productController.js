const connectDB = require("../config/connectDB");
const pool = connectDB();
const slugify = require("slugify");
const findAll = (table_name) => {
  return pool.query(`SELECT * FROM ${table_name}`, (err, data) => {
    return data;
  });
};

const create = async (req, res) => {
  const { name, price, mass, cate_id, suppilier_id, quantity } = req.body;
  if (!(name && price && mass && cate_id && suppilier_id && quantity)) {
    return res.status(400).send("All input is required");
  }
  const slug = await slugify(name, {
    lower: true, // convert to lower case, defaults to `false`
    locale: "vi", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
  pool.query(
    "INSERT INTO `product`(`name`, `price`, `mass`, `cate_id`, `suppilier_id` ,`quantity`, `slug`) VALUES (?, ?, ?, ? ,? , ?, ?);",
    [name, price, mass, cate_id, suppilier_id, quantity, slug],
    async (err, data) => {
      if (data.length !== 0) {
        console.log(data);
        const list = await findAll("product");
        console.log(list);
        // return res.json();
      }
    }
  );
};

const getList = async (req, res) => {
  const query = `SELECT T1.*, T2.* FROM product T1 
  JOIN product_image T2 ON T1.product_id = T2.product_id
  WHERE T2.primary_img = 1;`;
  pool.query(query, (err, data) => {
    if (err) throw new Error(err);
    // console.log(data);
    return res.send(data);
  });
};
const getSingle = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = `SELECT * FROM product T1 JOIN product_image T2
            ON T1.product_id = T2.product_id  WHERE T1.product_id = ?`;
  pool.query(query, [id], (err, data) => {
    if (err) throw new Error(err);
    console.log(data);
    let result = data[0];
    let arrImg = [];
    data.forEach((item) => {
      if (item.primary_img) {
        result.primary_img = result.primary_img;
      }
      arrImg.push(item.image_name);
    });
    result.arrImg = arrImg;

    console.log(result);
    return res.send(result);
  });
};
const editSingle = async (req, res) => {};
const deleteSingle = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const query = "DELETE FROM `product` WHERE product_id = ?";
  pool.query(query, [id], (err, data) => {
    if (err) throw new Error(err);
    console.log(data);
    return res.send(data);
  });
};
module.exports = {
  create,
  getList,
  getSingle,
  editSingle,
  deleteSingle,
};
