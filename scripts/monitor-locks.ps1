Write-Host "Fetching active locks..."

Invoke-RestMethod http://localhost:5000/api/locks  