<#
  fix-mojibake.ps1
  Parcourt les fichiers .html dans le répertoire courant et remplace des séquences
  d'encodage courantes par leurs caractères UTF-8 corrects.
  Usage: powershell -ExecutionPolicy Bypass -File .\fix-mojibake.ps1
#>

$map = @{
  'Ã©' = 'é'; 'Ã¨'='è'; 'Ãª'='ê'; 'Ã«'='ë'; 'Ã '='à'; 'Ã´'='ô'; 'Ã§'='ç'; 'Ã»'='û';
  'Ã‰'='É'; 'Ã€'='À'; 'Ã¨'='è'; 'Â©'='©'; 'â€™'='’'; 'â€“'='–'; 'â€œ'='“'; 'â€'='”';
  'â€”'='—'; 'Ã»'='û'; 'Ãº'='ú'; 'Ã¼'='ü'; 'Ã¶'='ö'; 'Ã©'='é';
}

$files = Get-ChildItem -Path (Get-Location) -Filter *.html -File
foreach ($f in $files) {
    $path = $f.FullName
    $text = Get-Content -Raw -Path $path -ErrorAction SilentlyContinue
    if ($null -eq $text) { continue }
    $orig = $text
    foreach ($k in $map.Keys) {
        $text = $text -replace [regex]::Escape($k), $map[$k]
    }
    if ($text -ne $orig) {
        Set-Content -Path $path -Value $text -Encoding UTF8
        Write-Host "Fixed: $path" -ForegroundColor Green
    } else {
        Write-Host "No changes: $path" -ForegroundColor DarkGray
    }
}
