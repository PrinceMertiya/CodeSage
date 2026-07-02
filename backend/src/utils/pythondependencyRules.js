const pythonDependencyRules = {

    streamlit: {
        category: "framework",
        value: "Streamlit"
    },

    flask: {
        category: "framework",
        value: "Flask"
    },

    django: {
        category: "framework",
        value: "Django"
    },

    fastapi: {
        category: "framework",
        value: "FastAPI"
    },

    "sentence-transformers": {
        category: "ai",
        value: "Sentence Transformers"
    },

    transformers: {
        category: "ai",
        value: "Hugging Face Transformers"
    },

    torch: {
        category: "ai",
        value: "PyTorch"
    },

    tensorflow: {
        category: "ai",
        value: "TensorFlow"
    },

    pdfplumber: {
        category: "pdf",
        value: "PDF Processing"
    },

    matplotlib: {
        category: "visualization",
        value: "Matplotlib"
    },

    altair: {
        category: "visualization",
        value: "Altair"
    }

};

module.exports = {
    pythonDependencyRules
};