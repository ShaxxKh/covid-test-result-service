docker build . -t shaxx/1.0.1 - сборка контейнера node-app из dockerFile. Испольняется на уровне с dockerFile

docker run -d --name postgresql01 -p 5432:5432 -e PG_DATABASE=postgres -e PG_USER=postgres -e PG_PASSWORD=postgres -e POSTGRES_PASSWORD=postgres -v data:/var/lib/postgresql/data postgres:latest

-d запуск контейнера на фоновом режиме
--name название контейнера
-p связь между самим сервером и докер контейнером по порту, первый порт - порт сервера. второй - порт докер контейнера
-e environment variable
-v создание папки и проброс с сервера в контейнер, data - папка где будут лежать оригинальные данные базы
postgres:latest - скачивается постгрес последней версии

---

chown -R 1000:1000 data - change owner for data directory

---

docker run -d -p 5000:5000 -e PG_HOST=postgresql01 -e PG_DATABASE=postgres -e PG_USER=postgres -e PG_PORT=5432 -e PG_PASSWORD=postgres -v hosts.txt:/etc/hosts --name node01 shaxx/1.0.1

-v - данные из файла hosts.txt из сервера заменят данные в файле по пути etc/hosts в докер контейнере
shaxx/1.0.1 - испольуем image докера для этого запуска контейнера
