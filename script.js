const express = require('express');
const axios = require('axios');
const url = require('url');
const app = express();

app.get('/', async (req, res) => {
  try {
    // Get parameters from the URL
    const urlParts = url.parse(req.url, true);
    const href = urlParts.href;
    // clean url by removing the /?url= part
    const imagelink = href.replace('/?url=', '');
    // Make a request to the URL
    const response = await axios.get(imagelink, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'utf-8');
    const data = buffer.toString('base64');
    // // Send the response back to the client as image
    res.send(`<img src="data:image/png;base64,${data}" />`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});