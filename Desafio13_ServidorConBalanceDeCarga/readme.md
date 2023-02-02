Dentro de la carpeta NginxNode/public donde esta el server.js ejecutar estos comandos:

pm2 start server.js --name="Cluster" --watch -i max -- -- 8000

pm2 start server.js --name="Fork" --watch -- -- 8080
pm2 start server.js --name="Fork1" --watch -- -- 8081
pm2 start server.js --name="Fork2" --watch -- -- 8082
pm2 start server.js --name="Fork3" --watch -- -- 8083
pm2 start server.js --name="Fork4" --watch -- -- 8084
pm2 start server.js --name="Fork5" --watch -- -- 8085

Dentro de la carpeta base de todo el proyecto donde esta nginx.exe ejecutar este comando:
nginx usando cmd
./nginx.exe usando powershell



