$root = Split-Path -Parent $PSScriptRoot
$scriptPath = Join-Path $PSScriptRoot 'convert_to_webp.py'

if (Get-Command py -ErrorAction SilentlyContinue) {
    & py -3 $scriptPath
    exit $LASTEXITCODE
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    & python $scriptPath
    exit $LASTEXITCODE
}

Write-Host "No se encontró Python en este equipo."
Write-Host "Instálalo con: winget install Python.Python.3.12"
Write-Host "O desde python.org"
Write-Host "Luego vuelve a ejecutar: .\scripts\convert_to_webp.ps1"
exit 1
