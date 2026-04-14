Write-Host "Running health check..."

Invoke-RestMethod http://localhost:5000/api/health