<div align="center">
    <img src="./frontend/public/membermaster.svg" width="50%" />
</div>

# MemberMaster:

**Is a client management system for business owners with a subsciption scheme.**

## Features:

1. Manage multiple businesses with ease.
2. Easy usage and clear workflow clutter-free.
3. Be informed of every detail with our notification system.

## Quick start:

### Start locally:

#### Requirements:

- Mysql
- Nodejs
- Npm
- Python3

#### Start the frontend and api servers:

In one terminal, `cd` into the repo and run the following command:

```bash
python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt
flask --app=api run
```

In a second terminal `cd` into the repo again and run:

```bash
cd frontend/
npm install
npm run dev
```

Now you should see the app running on [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

### Deploy with **Docker-Compose**:

To make a docker image ready to be run, execute the following command:

```bash
docker-compose . --name my-image
docker run -d my-image
```

### Deploy with Puppet:

**puppet -p deploy.pp**

## Back-end Routes:

| Route                                        | Method     | description |
| :------------------------------------------- | :--------: | :---------- |
| `/api/businesses/all`                        | **GET**    | retrieves all businesses
| `/api/businesses/<business_id>`              | **GET**    | retrieves one business by ID
| `/api/businesses/<business_id>/clients/all`  | **GET**    | retrieves all clients subscribed to a business
| `/api/businesses/add`                        | **POST**   | creates a new business
| `/api/businesses/<int:business_id>/delete`   | **DELETE** | deletes a business
| `/api/status`                                | **GET**    | returns the status of the API
| `/media/<path:file_path>`                    | **GET**    | downloads a file from the media directory
| `/api/subs/add/<int:business_id>`            | **POST**   | creates a new subscription connected to a business
| `/api/subs/business/<int:business_id>`       | **GET**    | retrieves all subscriptions of a business
| `/api/subs/user/<int:user_id>`               | **GET**    | retrieves all subscription of a specific client
| `/api/subs/current`                          | **GET**    | retrieves all subscription of the current authenticated user
| `/api/subs/update/<int:sub_id>`              | **POST**   | updates a subscription using its id
| `/api/subs/delete/<int:sub_id>`              | **DELETE** | deletes a business
| `/api/users/sign-up`                         | **POST**   | creates a new user
| `/api/users/sign-in`                         | **GET**    | authenticates a user using email and password
| `/api/users/sign-out`                        | **GET**    | deletes the authenticated user token
| `/api/users/<user_id>`                       | **GET**    | retrieves a user using his ID
| `/api/users/current`                         | **GET**    | retrieves the current authenticated user
| `/api/users/<user_id>/businesses`            | **GET**    | retrieves all businesses owned by a user

## Contribute:

**MemberMaster** is open for contibution, your efforts will help us deliver freatures quickly and fix bugs.

#### 1. fork and clone the repo locally:

from this page press `fork` at the top, and clone the new forked repo.

    git clone https://github.com/<your username>/membermaster.git

#### 1. Make your changes:

Make any changes you want, then commit them into the `main` branck!

    git add ./
    git commit -m 'Implemented: new feature..'
    git push origin main

#### 2. Make a pull request:

Go to your the forked repo on [GitHub](https://github.com) and make pull request.

># Note:  
>This might take time to be reviewed!
