import uvicorn
from fastapi import FastAPI
import json
from time import strftime

from fastapi.middleware.cors import CORSMiddleware

origins = ["*"]


file = open('todos.json', encoding='utf-8')
todos = json.load(file)


app = FastAPI(
    title="Todo List Project",
    description="Final Project CP353",
    version="1.0.0",
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to our todo list"}


@app.get("/todo", tags=["todos"])
async def get_todos() -> dict:
    file = open('todos.json', encoding='utf-8')
    todos = json.load(file)
    todolist = todos
    return todolist


@app.post("/todo", tags=["todos"])
async def add_todo(todo: dict) -> dict:

    if not todos:
        todoId = 1
    else:
        todoId = int(todos[-1]["id"]) + 1

    todo['id'] = todoId
    todo['createAt'] = strftime('%I:%M:%S%p %d/%m/%Y')
    todos.append(todo)
    with open('todos.json', 'w', encoding='utf-8') as f:
        json.dump(todos, f, ensure_ascii=False, indent=4)

    return {"data": todo }


@app.put("/todo/{id}", tags=["todos"])
async def update_todo(id: int, body: dict) -> dict:

    for todo in todos:
        if int(todo["id"]) == id:

            if "completed" in body:
                todo["completed"] = body["completed"]
                with open('todos.json', 'w', encoding='utf-8') as f:
                    json.dump(todos, f, ensure_ascii=False, indent=4)
            else:
                return {"data": "Invalid key. The key is completed"}
            
            
            return {"data": f"Todo with id {id} has been updated."}

    return {"data": f"Todo with id {id} not found."}


@app.delete("/todo/{id}", tags=["todos"])
async def delete_todo(id: int) -> dict:

    for todo in todos:
        if int(todo["id"]) == id:
            todos.remove(todo)
            with open('todos.json', 'w', encoding='utf-8') as f:
                json.dump(todos, f, ensure_ascii=False, indent=4)

            return {"data": f"Todo with id {id} has been removed."}

    return {"data": f"Todo with id {id} not found."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
