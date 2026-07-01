const getHealth = (req, res) => {

    res.status(200).json({

        status: "OK",

        message: "CodeSage API Running 🚀"

    });

};

module.exports = {

    getHealth

};