import { nanoid } from "nanoid";
import books from "./books.js";

export const addBook = (req, res, next) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;
    
    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }
    
    const id = nanoid(16);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBooks = { 
        id, 
        name, 
        year, 
        author, 
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };
    books.push(newBooks);

    const isSuccess = books.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
        return res.status(201).json({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: { bookId: id }
        });
    }

    return res.status(500).json({
        status: 'fail',
        message: 'Gagal menambahkan buku'
    });
};

export const getBooks = (req, res) => {
    const filteredBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    return res.status(200).json({
        status: 'success',
        data: {
            books: filteredBooks,
        },
    });
};

export const getBookDetail = (req, res) => {
    const { id } = req.params;
    const book = books.find((b) => b.id === id);

    if (book) {
        return res.json({
            status: 'success',
            data: {book}
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    });
};

export const editBookById = (req, res) => {
    const { id } = req.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        });
    }

    if (readPage > pageCount) {
        return res.status(400).json({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        });
    }
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((n) => n.id === id);

    if (index !== -1) {
        books[index] = { ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt };
        return res.json({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });
    }

    return res.status(404).json({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    });
}