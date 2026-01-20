// const ImageKit = require("imagekit");
import ImageKit from "imagekit";

const imagekit = new ImageKit({
   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT

//     publicKey: "public_I0cZra13vz/7+piDn3L6kJZKy4w=",
//    privateKey: "private_POf/RHWCqgk+4GoWBBJ4kjb0oTA=",
//    urlEndpoint: "https://ik.imagekit.io/tnfkzreto"




});

async function uploadFile(file, fileName) {
    const result = await imagekit.upload({
        file: file, // required
        fileName: fileName, // required
    })

    return result; // Return the URL of the uploaded file
}

// module.exports = {
//     uploadFile
// }

const storageService = {
    uploadFile
}

export default storageService;
