Write-Host "Creating MongoDB backup..."

if (Get-Command mongodump -ErrorAction SilentlyContinue) {
    $folder = "backup_" + (Get-Date -Format "yyyyMMdd_HHmmss")
    New-Item -ItemType Directory -Path $folder | Out-Null

    mongodump --uri="mongodb://localhost:27017/lockdb" --out=$folder

    Write-Host "Backup saved in $folder"
}
else {
    Write-Host "mongodump not installed"
}