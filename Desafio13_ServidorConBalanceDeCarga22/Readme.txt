pm2 start server.js --name="Cluster" --watch -i max -- -- 8000

pm2 start server.js --name="Fork" --watch -- -- 9000