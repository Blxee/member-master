# MemberMaster:

<img src="./frontend/public/membermaster.svg" width="50%" align="center" />

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
