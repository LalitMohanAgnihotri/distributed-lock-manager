Write-Host "Checking stale/expired locks..."

$locks = Invoke-RestMethod http://localhost:5000/api/locks
$now = Get-Date

foreach ($lock in $locks) {
    if ($null -ne $lock.expiresAt -and $lock.expiresAt -ne "") {
        $expiry = [datetime]$lock.expiresAt

        if ($expiry -lt $now) {
            Write-Host "Expired Lock Found: $($lock.resource) owned by $($lock.owner)"
        }
    }
}