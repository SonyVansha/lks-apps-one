## Database mongodb and redis Config Setup in Ubuntu
> Create .env file in Server root folder
```sh
MONGO_INITDB_ROOT_USERNAME=YOUR_MONGO_USER
MONGO_INITDB_ROOT_PASSWORD=YOUR_MONGO_PASSWORD
REDIS_PASSWORD=YOUR_REDIS_PASSWORD
```

Add Docker's official GPG key
```sh
sudo apt-get update
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
```

Add the repository to Apt sources:
```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Install the Docker packages:
```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose
```

Verification Docker:
```sh
sudo systemctl start docker
sudo systemctl enable docker
```


Running Docker compose in background system:
```bash
docker-compose up -d
```