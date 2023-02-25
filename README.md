# Coaching Log Frontend

## Requirements

* NodeJS

## Setup

1. Install packages

```bash
npm install
```

## Development and Build

Please change the variables in .env.XXX if needed. \
Please add the required command to package.json's "scripts" if needed

### Local Development

```bash
npm run start:local
```

### Production Development

Please note that the API_URL in .env.production hasn't been updated

```bash
npm run start:production
```

### Production Build

Please note that the API_URL in .env.production hasn't been updated.

```bash
npm run build:production
```

## Functions

1. Login with username and password, or session with cookies
2. Role-based access control and rendering
3. User and client
    1. Create
    2. Edit
    3. List
    4. Pagination
4. Assigning client to user (coach)
5. Coaching logs:
    1. Create
    2. Edit
    3. Lock
    4. List
    5. Side-by-side view
    6. Rendering based on states
6. Change password
7. Sign out

### Screenshots

![Coaching Log Screenshot](images/coaching_log.png?raw=true "Coaching Log Screenshot")

![Clients List Screenshot](images/clients_list.png?raw=true "Clients List Screenshot")
