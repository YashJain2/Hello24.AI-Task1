const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require("dotenv").config();
const { URL,CONSUMER_KEY,CONSUMER_SECRET } = process.env;

module.exports.Fetch = async (req, res) => {
    try {
        const api = new WooCommerceRestApi({
            url: URL,
            consumerKey: CONSUMER_KEY,
            consumerSecret: CONSUMER_SECRET,
            version: "wc/v3" // Set the API version
        });

        let dateAfter = new Date('December 12, 2022 00:00:00');
        dateAfter = dateAfter.toISOString();
        let dateBefore = new Date('December 29, 2022 00:00:00');
        dateBefore = dateBefore.toISOString();

        const perPage = 5; // Set the number of orders per page
        // Get the page value from the request query parameters
        const page = req.query.page || 1; // Default to page 1 if not provided
        
        // Process the response or store the data as needed
        api.get(`orders?page=${page}&per_page=${perPage}&after=${dateAfter}&before=${dateBefore}&order=asc&orderby=title`)
        .then((response) => {
            res.status(201)
            .json({ message: "Successfully recieved order", success: true, orders: response.data });
        })
        .catch((error) => {
          console.log(error.response.data);
        });       
    } catch (error) {
      console.error(error);
    }
  };