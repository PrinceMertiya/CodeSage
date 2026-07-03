const { parsePython } = require("./pythonParser");

const code = `
import fastapi

class UserService:

    async def login(self):
        pass

    def logout(self):
        pass

async def fetch_users():
    pass

def main():
    pass
`;

console.log(parsePython(code));