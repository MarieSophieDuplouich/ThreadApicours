erDiagram
    USER {
        int id PK
        string username
        string email
        string password
    }
    Task {
        int id PK
        string title
        string content
        datetime createdAt
        int userId FK
    }
    USER ||--o{ Task : has
