Write-Host 'Building containers...'
docker compose up --build -d
Write-Host 'App running at http://localhost:8080'