# receipt-processor-challenge

## Requirements

- Docker
- Docker Compose

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dbrun3/receipt-processor-challenge.git

git cd receipt-processor-challenge
```

### 2. Spin up

```bash
docker compose up --build
```

### 3. Test

And that's it. The server is exposed on port 3000, and ready to go. I know the instructions said not to use a database, but with docker it required 0 additional setup build with the schema being automatically pushed to it at build time!