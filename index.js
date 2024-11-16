import express from "express";
import axios from "axios";

const app = express();
const port = 5000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "hrideshh"
const yourPassword = "qwerty"
const yourApiKey = "6d0009c5-ae60-4153-bca4-19379b3e0102"
const yourBearerToken = "2486ebce-2eb6-43f7-9656-441cb0c828a9"

app.get("/" , (req , res) => {
    res.render("index.ejs" , {
        content : "Response will be generated here."
    });
});

//no auth
app.get("/noAuth" , async (req , res) => {
    try {
        const response = await axios.get(API_URL + "/random");
        console.log(response);
        
        res.render("index.ejs" , {
            content : JSON.stringify(response.data),
        })
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
} );

//basic auth
app.get("/basicAuth" , async (req , res) => {
    try {
        const response = await axios.get(API_URL + '/all?page=2' , {
            auth : {
                username : yourUsername,
                password : yourPassword
            }
        });
        console.log(response);
        
        res.render("index.ejs" , {
            content : JSON.stringify(response.data),
        })
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

//api key authz.
app.get("/apiKey" , async(req , res) => {
    try {
        const response = await axios.get(API_URL + "/filter" , {
            params : {
                score : 7,
                apiKey : yourApiKey
            }
        });
        console.log(response);
        
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

//token based auth
const config = {
    headers : {
        Authorization : `Bearer ${yourBearerToken}`, //Authorization header we are using so it is predefined
    }
}

app.get("/bearerToken" , async (req , res) => {
    try {
        const response = await axios.get(API_URL + '/secrets/2' , config); //that 2 is our path param id 
        //i.e. specifically identifying that api
        console.log(response);
        
        res.render("index.ejs" , {
            content : JSON.stringify(response.data)
        });
        
    } catch (error) {
        res.status(404).json({
            message : error.message
        });
    }
});

app.listen(port , () => {
    console.log(`listening on port ${port}`);
});