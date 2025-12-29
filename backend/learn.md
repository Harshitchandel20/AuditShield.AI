# Learn: FastAPI vs. Django

For AuditShield AI, we have chosen **FastAPI** as our backend framework instead of Django. Here's why:

## 1. High Performance & Asynchronous Support
Auditing tasks (like PDF parsing and RAG retrieval) are I/O intensive. FastAPI's native support for `async/await` allows us to handle multiple concurrent requests efficiently.

## 2. Type Safety & Validation
Pydantic integration ensures automatic request validation and improved developer experience.

## 3. Lightweight & Modular
FastAPI's minimalist approach allows us to keep our clean architecture lean and only add the components we need.

## 4. Modern Ecosystem
FastAPI is the industry standard for modern Python AI services, with a robust ecosystem for async performance.
