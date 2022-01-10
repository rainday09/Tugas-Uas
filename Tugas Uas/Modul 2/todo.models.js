const mongoose = require("mongoose");

const TodoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Todo = mongoose.model("todo", TodoListSchema);

module.exports = Todo;

const express = require("express");

const router = express.Router();

const {
    listAllTodo,
    createTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todo.controller.js");

router.get("/", listAllTodo);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;

const Todo = require("../models/todo.models.js");

exports.listAllTodo = (req, res) => {
    Todo.find()
        .then((todo) => {
            console.log({ todo });
            res.json(todo);
        })
        .catch((err) => {
            res
                .status(404)
                .json({ message: "There isnt any todo available", error: err.message });
        });
};

exports.createTodo = (req, res) => {
    Todo.create(req.body)
        .then((todo) => {
            console.log({ todo });
            res.json({
                message: "Cheers!! You have successfully added TODO",
                todo,
            });
        })
        .catch((err) => {
            res.status(404).json({
                message: "Sorry your todo list cannot be added",
                error: err.message,
            });
        });
};

exports.updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((todo) => {
            console.log({ todo });
            return res.json({
                message: "Cheers!! You have successfully updated TODO",
                todo,
            });
        })
        .catch((err) => {
            res.status(404).json({
                message: "Sorry your todo list cannot be updated",
                error: err.message,
            });
        });
};

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body)
        .then((todo) => {
            console.log({ todo });
            res.json({
                message: "Cheers!! You have successfully deleted your TODO",
                todo,
            });
        })
        .catch((err) => {
            res.status(404).json({
                message: "Sorry your todo is not there",
                error: err.message,
            });
        });
};