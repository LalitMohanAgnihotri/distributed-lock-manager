Write-Host "Starting deployment..."

docker compose up --build -d

Write-Host "Application running"
Write-Host "Frontend: http://localhost:5173"
Write-Host "Backend:  http://localhost:5000"